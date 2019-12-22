import { Min } from 'class-validator';
import { ArgsType, Field, ID, Int, ObjectType, InputType } from 'type-graphql';

import { User } from '../user/user.type';

@ObjectType()
class Topic {
  @Field(type => ID)
  name: string;
}

@ObjectType()
class Post {
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
class GetPostsArgs {
  @Field(type => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;

  @Field(type => Int)
  @Min(1)
  take = 25;
}

@ArgsType()
class GetPostArgs {
  @Field(type => String)
  id: string;
}

@InputType()
class CreatePostInput {
  @Field(type => String)
  title: string;

  @Field(type => String)
  description: string;

  @Field(type => String)
  contentLink: string;

  @Field(type => String)
  thumbnailImageUrl: string;

  @Field(type => String)
  contentMakerEmail: string;

  @Field(type => [CreatePostTopicInput])
  topics: CreatePostTopicInput[];
}

@InputType()
class CreatePostTopicInput {
  @Field(type => String)
  name: string;
}

@InputType()
class LikePostInput {
  @Field(type => String)
  id: string;
}

@InputType()
class DeletePostInput {
  @Field(type => String)
  id: string;
}

export { Post, GetPostsArgs, GetPostArgs, CreatePostInput, LikePostInput, DeletePostInput };
