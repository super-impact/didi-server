import { Field, ArgsType } from 'type-graphql';

export enum Provider {
  email = 'email',
  GOOGLE = 'google',
}

@ArgsType()
export class SignInArgs {
  @Field()
  provider: Provider;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}

@ArgsType()
export class SignUpArgs {
  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  displayName: string;

  @Field()
  profileImageUrl: string;

  @Field()
  provider: string;
}
