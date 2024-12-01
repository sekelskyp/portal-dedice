import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateArticleInput {
  @Field(() => String)
  title!: string

  @Field(() => Date)
  date!: Date

  @Field(() => String)
  content!: string

  @Field(() => GraphQLUpload)
  coverImage!: FileUpload
}
