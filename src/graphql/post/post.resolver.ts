import { Args, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { PostService } from '../../service';
import PostDataLoader from './post.dataloader';
import { GetPostArgs, GetPostsArgs, Post } from './post.type';

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
}

export default PostResolver;
