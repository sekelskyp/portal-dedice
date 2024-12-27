import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class UploadFileToProceedingInput {
  @Field(() => GraphQLUpload)
  file!: FileUpload

  @Field(() => ID)
  proceedingId!: number
}
