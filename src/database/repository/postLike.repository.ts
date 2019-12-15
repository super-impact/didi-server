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

  public async isExistedPostLikeByPostAndUser({ post, user }: { post: Pick<Post, 'id'>; user: Pick<User, 'id'> }) {
    const postLike = await this.findOne({ post, user });

    return !!postLike;
  }
}

export default PostLikeRepository;
