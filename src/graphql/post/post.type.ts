import { Min } from 'class-validator';
import { ArgsType, Field, ID, Int, ObjectType } from 'type-graphql';

import { User } from '../user/user.type';

@ObjectType()
class Topic {
  @Field(type => ID)
  name: string;
}

@ObjectType()
export class Post {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  contentLink: string;

  @Field()
  thumbnailImageUrl: string;

  @Field()
  contentMakerEmail: string;

  @Field()
  createdAt: Date;

  @Field(type => User)
  contributorUser: User;

  @Field(type => [Topic])
  topics: Topic[];

  @Field()
  likeCount: number;
}

@ArgsType()
export class GetPostsArgs {
  @Field(type => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;

  @Field(type => Int)
  @Min(1)
  take = 25;
}

@ArgsType()
export class GetPostArgs {
  @Field(type => String)
  id: string;
}
