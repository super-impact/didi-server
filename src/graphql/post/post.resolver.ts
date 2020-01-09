import { Arg, Args, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PostLikeRepository, PostRepository, UserRepository } from '../../database/repository';
import { ContextType } from '../../middlewares/auth.mididleware';
import { PostService } from '../../service';
import { removeQueryString } from '../../utils';
import { generateGraphQLError, GraphQLErrorMessage } from '../error';
import PostDataLoader from './post.dataloader';
import {
  CheckDuplicationContentLinkInput,
  CreatePostInput,
  DeletePostInput,
  GetPostArgs,
  GetPostsArgs,
  LikePostInput,
  Post,
} from './post.type';

@Resolver(Post)
@Service()
class PostResolver {
  constructor(
    private postService: PostService,
    private postDataLoader: PostDataLoader,
    @InjectRepository() private readonly userRepository: UserRepository,
    @InjectRepository() private readonly postRepository: PostRepository,
    @InjectRepository() private readonly postLikeRepository: PostLikeRepository,
  ) {}

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
  async createPost(@Ctx() context: ContextType, @Arg('input') input: CreatePostInput) {
    const { id: userId } = context.token;
    const { title, description, contentLink, thumbnailImageUrl, contentMakerEmail, topics } = input;
    const pureContentLink = removeQueryString(contentLink);

    const isExistedUser = await this.userRepository.isExistedUserById(userId);

    if (!isExistedUser) {
      return generateGraphQLError(GraphQLErrorMessage.NotFoundUser);
    }

    const isExistedPost = await this.postRepository.isExistedPostByContentLink(pureContentLink);

    if (isExistedPost) {
      return generateGraphQLError(GraphQLErrorMessage.ExistPost);
    }

    const user = await this.userRepository.findById(userId);

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

  @Mutation(returns => Boolean)
  async checkDuplicationContentLink(
    @Ctx() context: ContextType,
    @Arg('input') input: CheckDuplicationContentLinkInput,
  ) {
    const { id: userId } = context.token;
    const pureContentLink = removeQueryString(input.contentLink);

    const isExistedUser = await this.userRepository.isExistedUserById(userId);

    if (!isExistedUser) {
      return generateGraphQLError(GraphQLErrorMessage.NotFoundUser);
    }

    return this.postRepository.isExistedPostByContentLink(pureContentLink);
  }

  @Mutation(returns => Post)
  async likePost(@Ctx() context: ContextType, @Arg('input') input: LikePostInput) {
    const { id: userId } = context.token;

    const isExistedUser = await this.userRepository.isExistedUserById(userId);

    if (!isExistedUser) {
      return generateGraphQLError(GraphQLErrorMessage.NotFoundUser);
    }

    const isExistedPost = await this.postRepository.isExistedPostById(input.id);

    if (!isExistedPost) {
      return generateGraphQLError(GraphQLErrorMessage.NotFoundPost);
    }

    const isExistedPostLike = await this.postLikeRepository.isExistedPostLikeByPostAndUser({
      post: { id: input.id },
      user: { id: userId },
    });

    if (isExistedPostLike) {
      return generateGraphQLError(GraphQLErrorMessage.ExistPostLike);
    }

    return this.postService.likePost({ post: { id: input.id }, user: { id: userId } });
  }

  @Authorized()
  @Mutation(returns => Post)
  async deletePost(@Ctx() context: ContextType, @Arg('input') input: DeletePostInput) {
    const { id: userId } = context.token;

    return this.postService.deletePost({ post: { id: input.id }, user: { id: userId } });
  }
}

export default PostResolver;
