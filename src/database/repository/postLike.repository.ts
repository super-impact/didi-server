import { Service } from 'typedi';
import { EntityRepository, In, Repository } from 'typeorm';

import { Post, PostLike } from '../entity';

@Service()
@EntityRepository(PostLike)
class PostLikeRepository extends Repository<PostLike> {
  public async getLikeCountByPosts(posts: Partial<Post>[]) {
    return this.find({
      relations: ['post'],
      where: {
        post: In(posts.map(post => post.id)),
      },
    });
  }
}

export default PostLikeRepository;
