import { InheritanceProcedureData } from '../graphql/modules/inheritanceProcedure/inheritaceProcedureRepository'
import { CustomContext } from '../types/types'
// Private helper function to generate a unique name for a new procedure
function generateProcedureName(name: string, startDate: Date): string {
  const formattedDate = startDate.toISOString().split('T')[0].replace(/-/g, '_')
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
  return `${formattedDate}_${initials}`
}

// Function to create a new procedure
export async function createProcedure(
  data: InheritanceProcedureData,
  context: CustomContext
): Promise<number> {
  const { inheritanceProcedureRepository } = context
  const procedureName = generateProcedureName(data.name, data.startDate)

  const procedureId = await inheritanceProcedureRepository.createProcedure({
    ...data,
    name: procedureName,
  })
  return procedureId.id
}

// Function to close an existing procedure
export async function closeProcedure(
  procedureId: number,
  context: CustomContext
): Promise<void> {
  const { inheritanceProcedureRepository } = context

  // Retrieve the procedure by ID to check its current state
  const procedure =
    await inheritanceProcedureRepository.getProcedureById(procedureId)

  // Check if the procedure is in an "open" state
  if (!procedure || procedure.state !== 'InProgress') {
    throw new Error('Only an open procedure can be closed')
  }

  // Proceed to close the procedure if it is "InProgress"
  const now = new Date()
  await inheritanceProcedureRepository.updateProcedure(procedureId, {
    state: 'Closed',
    endDate: now,
  })
}

export async function addBeneficiaryToProcedure(
  procedureId: number,
  beneficiaryId: number,
  context: CustomContext
): Promise<void> {
  const { beneficiaryRepository } = context
  await beneficiaryRepository.insertBeneficiaryProcedureRelation({
    inheritanceProcedureId: procedureId,
    beneficiaryId,
  })
}

export async function addBeneficiariesToProcedure(
  procedureId: number,
  beneficiaryIds: number[],
  context: CustomContext
): Promise<void> {
  const { beneficiaryRepository } = context

  // Prepare the array of relation objects for bulk insertion
  const relations = beneficiaryIds.map((beneficiaryId) => ({
    inheritanceProcedureId: procedureId,
    beneficiaryId,
  }))

  // Call the repository method for bulk insertion
  await beneficiaryRepository.insertMultipleBeneficiaryProcedureRelations(
    relations
  )
}

// Remove a beneficiary from a procedure
export async function removeBeneficiaryFromProcedure(
  procedureId: number,
  beneficiaryId: number,
  context: CustomContext
): Promise<void> {
  const { beneficiaryRepository } = context
  await beneficiaryRepository.deleteBeneficiaryProcedureRelations(
    procedureId,
    beneficiaryId
  )
}

// Function to assign a notary to a procedure
export async function assignNotary(
  procedureId: number,
  notaryId: number,
  context: CustomContext
): Promise<void> {
  const { inheritanceProcedureRepository } = context
  await inheritanceProcedureRepository.updateProcedure(procedureId, {
    notaryId,
  })
}
