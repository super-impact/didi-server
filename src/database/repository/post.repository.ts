import { Service } from 'typedi';
import { EntityRepository, In, Repository } from 'typeorm';

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
      .orderBy('posts.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();
  }

  public async getPostById(id: string) {
    return this.findOne({
      relations: ['contributorUser', 'topics', 'postLikes'],
      where: {
        id,
      },
    });
  }

  public async getPostByIds(ids: string[]) {
    return this.find({
      relations: ['contributorUser', 'topics'],
      where: {
        id: In(ids.map(id => id)),
      },
    });
  }

  public findByContentLink(contentLink: string) {
    return this.findOne({ contentLink });
  }

  public async isExistedPostByContentLink(contentLink: string) {
    const post = await this.findOne({ contentLink, isDeleted: false });

    return !!post;
  }

  public async isExistedPostById(id: string) {
    const isExistedPost = await this.findOne({ id, isDeleted: false });

    return !!isExistedPost;
  }

  public async isCorrectPostContributorUser({ postId, userId }: { postId: string; userId: string }) {
    const foundPost = await this.findOne({
      where: {
        id: postId,
        contributorUser: {
          id: userId,
        },
      },
    });

    return !!foundPost;
  }
}

export default PostRepository;
