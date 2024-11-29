import { CustomContext } from '@backend/types/types'

import { sendEmail } from './emailService'
import { getUsersForProceeding } from './proceedingService'
import { renderTemplate } from './templateService'

export const notifyUsersNewMessage = async ({
  chatId,
  senderId,
  context,
  senderDisplayName,
  messageBody,
  senderEmail,
}: {
  chatId: number
  senderId: number
  senderDisplayName: string
  messageBody: string
  senderEmail: string
  context: CustomContext
}) => {
  const chat = await context.chatRepository.getChatById(chatId)
  if (!chat) {
    throw new Error('Chat not found')
  }
  const proceeding = await context.proceedingRepository.getProceedingById(
    chat.proceedingId
  )
  if (!proceeding) {
    throw new Error('Proceeding not found')
  }
  const usersToNotify = await getUsersForProceeding(proceeding.id, context)

  const html = await renderTemplate('chatNotification', {
    proceedingName: proceeding.name,
    senderName: senderDisplayName,
    senderEmail,
    messageBody,
  })

  for (const user of usersToNotify) {
    if (user.id === senderId) {
      console.log(
        `Skipping email notification for user ${user.id} for procedure ${proceeding.id}`
      )
      continue
    }

    if (!user.sendNotifications) {
      // console.log(
      //   `Skipping email notification, notifications disabled for user ${user.id} for procedure ${proceeding.id}`
      // )
      continue
    }

    // console.log(
    //   `Sending email notification to user ${user.id} for procedure ${proceeding.id}`
    // )

    try {
      await sendEmail({
        to: user.email,
        subject: `Nová zpráva v dědickém řízení ${proceeding.name}`,
        html,
      })
    } catch (error) {
      console.error(
        `Error sending email notification to user ${user.id} for procedure ${proceeding.id}`
      )
    }
  }
}
