import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field()
  profileImageUrl: string;

  @Field()
  provider: string;
  
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
