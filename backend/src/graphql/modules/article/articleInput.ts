import GraphQLUpload from 'graphql-upload/GraphQLUpload'
import { FileUpload } from 'graphql-upload/Upload'
import { Field, InputType } from 'type-graphql'

@InputType()
export class ArticleInput {
  @Field(() => String)
  title!: string

  @Field(() => Date)
  date!: Date

  @Field(() => String)
  content!: string

  @Field(() => GraphQLUpload)
  coverPicture!: FileUpload
}
