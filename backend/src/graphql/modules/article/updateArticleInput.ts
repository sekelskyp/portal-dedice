import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateArticleInput {
  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => Date, { nullable: true })
  date?: Date

  @Field(() => String, { nullable: true })
  content?: string

  @Field(() => GraphQLUpload, { nullable: true })
  coverImage?: FileUpload
}
