import { Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { PostService } from '../../service';
import { GetPostsArgs, Post } from './post.type';

@Resolver(Post)
@Service()
class PostResolver {
  constructor(private postService: PostService) {}

  @Query(returns => [Post])
  async posts(@Args() { skip, take }: GetPostsArgs) {
    return this.postService.getPosts({ take, skip });
  }
}

export default PostResolver;
