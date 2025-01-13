import { CustomContext } from '@backend/types/types'

import { getUsersForProceeding } from '../graphql/modules/proceeding/proceedingService'

import { sendEmail } from './emailService'
import { renderTemplate } from './templateService'

export const notifyUsersNewMessage = async ({
  chatId,
  senderId,
  senderDisplayName,
  messageBody,
  senderEmail,
  context,
}: {
  chatId: number
  senderId: number
  senderDisplayName: string
  messageBody: string
  senderEmail: string
  context: CustomContext
}) => {
  // Fetch chat and validate
  const chat = await context.chatRepository.getChatById(chatId)
  if (!chat) {
    throw new Error('Chat not found')
  }

  // Fetch proceeding and validate
  const proceeding = await context.proceedingRepository.getProceedingById(
    chat.proceedingId
  )
  if (!proceeding) {
    throw new Error('Proceeding not found')
  }

  // Get users to notify
  const usersToNotify = await getUsersForProceeding(proceeding.id, context)

  // Render the email template once
  const html = await renderTemplate('chatNotification', {
    proceedingName: proceeding.name,
    senderName: senderDisplayName,
    senderEmail,
    messageBody,
  })

  // Filter users to notify (exclude sender and those without notifications enabled)
  const filteredUsers = usersToNotify.filter(
    (user) => user.id !== senderId && user.sendNotifications
  )

  // Notify users
  await Promise.all(
    filteredUsers.map((user) =>
      sendNotificationEmail(user, html, proceeding.name)
    )
  )
}

// Private function for sending notification emails
async function sendNotificationEmail(
  user: { id: number; email: string; sendNotifications: boolean },
  html: string,
  proceedingName: string
): Promise<void> {
  try {
    await sendEmail({
      to: user.email,
      subject: `Nová zpráva v dědickém řízení ${proceedingName}`,
      html,
    })
  } catch {
    // Log error without interrupting other notifications
    console.error(`Error sending email notification to user ${user.id}`)
  }
}
