import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Post } from '../entity';

@Service()
@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  public async getPosts({ take, skip }: { take: number; skip: number }) {
    return this.find({
      relations: ['contributorUser', 'topics'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
  }
}

export default PostRepository;
