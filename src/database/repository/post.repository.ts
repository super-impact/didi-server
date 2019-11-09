import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Post } from '../entity';

@Service()
@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  public async getPosts({ take, skip }: { take: number; skip: number }) {
    return this.createQueryBuilder('posts')
      .leftJoinAndSelect('posts.topics', 'topics')
      .leftJoinAndSelect('posts.contributorUser', 'users')
      .leftJoinAndSelect('posts.postLikes', 'postLike')
      .leftJoin('posts.postLikes', 'user')
      .loadRelationCountAndMap('posts.likeCount', 'posts.postLikes')
      .orderBy('posts.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();
  }
}

export default PostRepository;
