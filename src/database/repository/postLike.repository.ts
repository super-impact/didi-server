import { Service } from 'typedi';
import { EntityRepository, In, Repository } from 'typeorm';

import { Post, PostLike, User } from '../entity';

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

  public async findPostLikeByPostAndUser(post: Post, user: User) {
    return this.find({
      where: {
        post,
        user,
      },
    });
  }
}

export default PostLikeRepository;
