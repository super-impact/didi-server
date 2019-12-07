import { Field, InputType, ObjectType } from 'type-graphql';

import { User } from '../user/user.type';

enum Provider {
  Email = 'email',
  Google = 'google',
}

@ObjectType()
class Auth {
  @Field(type => User)
  user: User;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@InputType()
class SignInInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}

@InputType()
class SignUpInput {
  @Field()
  provider: Provider;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  profileImageUrl?: string;
}

export { Provider, Auth, SignInInput, SignUpInput };
