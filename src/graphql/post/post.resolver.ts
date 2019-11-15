import { Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { PostService } from '../../service';
import { GetPostArgs, GetPostsArgs, Post } from './post.type';

@Resolver(Post)
@Service()
class PostResolver {
  constructor(private postService: PostService) {}

  @Query(returns => [Post])
  async posts(@Args() { skip, take }: GetPostsArgs) {
    return this.postService.getPosts({ take, skip });
  }

  @Query(returns => Post)
  async post(@Args() { id }: GetPostArgs) {
    return this.postService.getPost({ id });
  }
}

export default PostResolver;
