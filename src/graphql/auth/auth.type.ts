import { Field, InputType, registerEnumType } from 'type-graphql';

export enum Provider {
  password = 'password',
  google = 'google',
}

registerEnumType(Provider, { name: 'Provider' });

@InputType()
export class SignInInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(type => Provider)
  provider: string;
}

@InputType()
export class SignUpInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  displayName: string;

  @Field()
  profileImageUrl: string;

  @Field(type => Provider)
  provider: string;
}
