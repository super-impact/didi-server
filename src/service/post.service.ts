import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PostLikeRepository, PostRepository, UserRepository } from '../database/repository';
import { Post } from '../graphql/post/post.type';
import { User } from '../graphql/user/user.type';

@Service()
class PostService {
  constructor(
    @InjectRepository() private readonly postRepository: PostRepository,
    @InjectRepository() private readonly postLikeRepository: PostLikeRepository,
    @InjectRepository() private readonly userRepository: UserRepository,
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

  public async createPost(post: Partial<Post>) {
    return this.postRepository.save(post);
  }

  public async likePost({ post, user }: { post: Pick<Post, 'id'>; user: Pick<User, 'id'> }) {
    await this.postLikeRepository.save({ post, user });

    return this.postRepository.getPostById(post.id);
  }

  public async deletePost({ post }: { post: Pick<Post, 'id'> }) {
    await this.postRepository.update({ id: post.id }, { isDeleted: true, deletedAt: new Date().toUTCString() });

    return this.postRepository.getPostById(post.id);
  }
}

export default PostService;
