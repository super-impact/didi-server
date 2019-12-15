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

  public async isExistedPostByContentLink(contentLink: string) {
    const post = await this.postRepository.findByContentLink(contentLink);
    return !!post;
  }

  public async createPost(post: Partial<Post>) {
    return this.postRepository.save(post);
  }

  public async isExistedUserById(id: string) {
    const isExistedUser = await this.userRepository.findById(id);
    return !!isExistedUser;
  }

  public async isExistedPostById(id: string) {
    const isExistedPost = await this.postRepository.getPostById(id);
    return !!isExistedPost;
  }

  public async isExistedPostLikeByPostAndUser({ post, user }: { post: Pick<Post, 'id'>; user: Pick<User, 'id'> }) {
    const postLike = await this.postLikeRepository.findPostLikeByPostAndUser(post, user);

    return !!postLike;
  }

  public async likePost({ post, user }: { post: Pick<Post, 'id'>; user: Pick<User, 'id'> }) {
    await this.postLikeRepository.save({ post, user });

    return this.postRepository.getPostById(post.id);
  }
}

export default PostService;
