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

  public async findPostLikeByPostAndUser(post: Partial<Post>, user: Partial<User>) {
    return this.findOne({
      post,
      user,
    });
  }
}

export default PostLikeRepository;
