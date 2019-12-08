import { Args, FieldResolver, Query, Resolver, Root, Mutation, Arg } from 'type-graphql';
import { Service } from 'typedi';

import { PostService } from '../../service';
import PostDataLoader from './post.dataloader';
import { GetPostArgs, GetPostsArgs, Post, CreatePostInput } from './post.type';
import { generateGraphQLError, GraphQLErrorMessage } from '../error';
import { removeQueryString } from '../../utils';

@Resolver(Post)
@Service()
class PostResolver {
  constructor(private postService: PostService, private postDataLoader: PostDataLoader) {}

  @Query(returns => [Post])
  async posts(@Args() { skip, take }: GetPostsArgs) {
    return this.postService.getPosts({ take, skip });
  }

  @Query(returns => Post)
  async post(@Args() { id }: GetPostArgs) {
    return this.postService.getPost({ id });
  }

  @FieldResolver()
  async likeCount(@Root() post: Post) {
    return this.postDataLoader.postLikeCountLoader.load(post.id);
  }

  @Mutation(returns => Post)
  async createPost(@Arg('input') input: CreatePostInput) {
    const { title, description, contentLink, thumbnailImageUrl, contentMakerEmail, topics } = input;
    const pureContentLink = removeQueryString(contentLink);

    const isExistedPost = await this.postService.isExistedPostByContentLink(pureContentLink);

    if (isExistedPost) {
      return generateGraphQLError(GraphQLErrorMessage.ExistPost);
    }

    const user = {
      id: '0a903479-611f-4848-b03f-9962e330baaf',
      email: 'jhn3981@gmail.com',
      displayName: 'jhn3981',
      createdAt: new Date('2019-12-08 01:24:46.161762'),
    };

    return this.postService.createPost({
      title,
      description,
      contentLink: pureContentLink,
      thumbnailImageUrl,
      contentMakerEmail,
      contributorUser: user,
      topics,
    });
  }
}

export default PostResolver;
