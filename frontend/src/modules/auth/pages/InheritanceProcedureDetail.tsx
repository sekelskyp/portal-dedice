import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

const GET_PROCEDURE_QUERY = gql(/* GraphQL */ `
  query GetProcedureById($id: Int!) {
    getProcedureById(id: $id) {
      id
      name
      mainBeneficiary {
        id
        userId
        user {
          id
          email
        }
        contactId
        contact {
          id
          email
          name
          surname
        }
      }
      beneficiaries {
        id
        userId
        user {
          id
          email
        }
        contactId
        contact {
          id
          email
        }
        deceasedRelation
      }
      procedureAssets {
        id
        name
        value
      }
      state
    }
  }
`)

interface ProcedureDetailProps {
  id: string
}

const InheritanceProcedureDetail: React.FC = () => {
  const { id } = useParams()
  const idInt = parseInt(id ?? '0', 10)
  const { loading, error, data } = useQuery(GET_PROCEDURE_QUERY, {
    variables: { id: idInt },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const procedure = data?.getProcedureById

  console.log(procedure)

  const totalAssetsValue = procedure?.procedureAssets.reduce(
    (sum: number, asset: any) => sum + asset.value,
    0
  )

  return (
    <div>
      <h1>Procedure Detail</h1>
      {procedure ? (
        <div>
          <p>ID: {procedure.id}</p>
          <p>Name: {procedure.name}</p>
          {/* Add more fields as necessary */}
          <p>
            Main beneficiary: {procedure.mainBeneficiary.contact.name}{' '}
            {procedure.mainBeneficiary.contact.surname}
          </p>
          <p>Dedicove</p>
          <ul>
            {procedure.beneficiaries.map((beneficiary: any) => (
              <li key={beneficiary.id}>
                <p>ID: {beneficiary.id}</p>
                <p>User ID: {beneficiary.userId}</p>
                <p>User Email: {beneficiary.user.email}</p>
                <p>Contact ID: {beneficiary.contactId}</p>
                <p>
                  Contact Name: {beneficiary.contact.name}{' '}
                  {beneficiary.contact.surname}
                </p>
                <p>Contact Email: {beneficiary.contact.email}</p>
                <p>Deceased Relation: {beneficiary.deceasedRelation}</p>
              </li>
            ))}
          </ul>
          <p>Assets</p>
          <p>Total Assets Value: {totalAssetsValue}</p>
          <ul>
            {procedure.procedureAssets.map((asset: any) => (
              <li key={asset.id}>
                <p>ID: {asset.id}</p>
                <p>Name: {asset.name}</p>
                <p>Value: {asset.value}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No procedure found</p>
      )}
    </div>
  )
}

export default InheritanceProcedureDetail
