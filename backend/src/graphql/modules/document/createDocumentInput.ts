import GraphQLUpload from 'graphql-upload/GraphQLUpload'
import { FileUpload } from 'graphql-upload/Upload'
import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class UploadDocumentInput {
  @Field(() => GraphQLUpload)
  file!: FileUpload

  @Field()
  filename!: string

  @Field(() => ID)
  userOwnerId?: number

  @Field(() => ID)
  taskId?: number

  @Field(() => ID)
  inheritanceProcedureId!: number
}
