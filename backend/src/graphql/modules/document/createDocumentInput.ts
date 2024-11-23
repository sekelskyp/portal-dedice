import GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { FileUpload } from 'graphql-upload/Upload.js'
import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class UploadDocumentInput {
  @Field(() => GraphQLUpload)
  file!: FileUpload

  @Field(() => ID)
  inheritanceProcedureId!: number
}
