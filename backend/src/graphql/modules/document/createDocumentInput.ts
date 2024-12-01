import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class UploadDocumentInput {
  @Field(() => GraphQLUpload)
  file!: FileUpload

  @Field(() => ID)
  inheritanceProcedureId!: number
}
