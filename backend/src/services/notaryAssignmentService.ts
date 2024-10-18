import { notaryAssignments } from '../notaryAssignments/notaryData'

/**
 * Function to fetch the assigned notary's name based on the Prague district number and date of birth
 * @param districtNumber - Prague district number (e.g., 1, 2, 3, etc.)
 * @param birthDate - User's date of birth in the format YYYY-MM-DD
 * @returns The assigned notary's name based on district, birth month, and day
 */
export const getNotaryByDistrictAndDate = (
  districtNumber: number,
  birthDate: string
): string | null => {
  // Parse the birth date to extract the birth month and day
  const birthDateObj = new Date(birthDate)
  const birthMonth = birthDateObj.toLocaleString('en-US', { month: 'long' })
  const birthDay = birthDateObj.getDate()

  // Get the notary data for the given Prague district number
  const districtNotaries = notaryAssignments[districtNumber]

  if (!districtNotaries) {
    throw new Error(
      `No notary found for Prague district number: ${districtNumber}`
    )
  }

  // Iterate through notaries to find one who works in the given birth month and date
  for (const notary of districtNotaries) {
    const notaryDaysForMonth = notary.dates[birthMonth]
    if (notaryDaysForMonth && notaryDaysForMonth.includes(birthDay)) {
      return notary.name // Return the notary's name if both month and date match
    }
  }

  // Return an error if no notary was found for the given month and day
  throw new Error(
    `No notary found for district number ${districtNumber}, birth month: ${birthMonth}, and day: ${birthDay}`
  )
}
