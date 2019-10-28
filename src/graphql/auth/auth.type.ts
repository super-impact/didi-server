import { Field, InputType } from 'type-graphql';

enum AuthType {
  email = 'email',
  GOOGLE = 'google',
}

@InputType()
class SignInInput {
  @Field()
  authType: AuthType;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}

@InputType()
class SignUpInput {
  @Field()
  authType: AuthType;

  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field({ nullable: true })
  password?: string;
}

export { AuthType, SignInInput, SignUpInput };
