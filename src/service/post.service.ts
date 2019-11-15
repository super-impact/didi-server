import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PostLikeRepository, PostRepository } from '../database/repository';
import { Post } from '../graphql/post/post.type';

@Service()
class PostService {
  constructor(
    @InjectRepository() private readonly postRepository: PostRepository,
    @InjectRepository() private readonly postLikeRepository: PostLikeRepository,
  ) {}

  public async getPosts({ take, skip }: { take: number; skip: number }) {
    return this.postRepository.getPosts({ take, skip });
  }

  public async getPost({ id }: Partial<Post>) {
    return this.postRepository.getPostById(id);
  }

  public async getPostLikeCountByIds(postIds: string[]) {
    const posts = postIds.map(postId => ({
      id: postId,
    }));

    return this.postLikeRepository.getLikeCountByPosts(posts);
  }
}

export default PostService;
