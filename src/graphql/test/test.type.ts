import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
class Test {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
class NewTestInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}

export { Test, NewTestInput };
