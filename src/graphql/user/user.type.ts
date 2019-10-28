import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class User {
  @Field(type => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field()
  createdAt: Date;
}

export { User };
