import { ArgsType, Field, ID, ObjectType } from 'type-graphql';

import { Post } from '../post/post.type';

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
  createdAt: Date;

  @Field()
  likeCount: number;

  @Field(type => [Post])
  likePosts: Post[];
}

@ArgsType()
export class UserArgs {
  @Field(type => String)
  id: string;
}
