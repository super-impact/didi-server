import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { User } from '../database/entity';
import { PostLikeRepository, PostRepository, UserRepository } from '../database/repository';
import { generateGraphQLError, GraphQLErrorMessage } from '../graphql/error';

@Service()
class UserService {
  constructor(
    @InjectRepository() private readonly userRepository: UserRepository,
    @InjectRepository() private readonly postLikeRepository: PostLikeRepository,
    @InjectRepository() private readonly postRepository: PostRepository,
  ) {}

  public async createUser(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  public async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  public async getUser(user: Pick<User, 'id'>) {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      return generateGraphQLError(GraphQLErrorMessage.NotFoundUser);
    }

    return foundUser;
  }

  public async getLikePosts(user: Pick<User, 'id'>) {
    const likePost = await this.postLikeRepository.findLikePostsByUser({ id: user.id });
    return await this.postRepository.getPostByIds(likePost.map(likePostId => likePostId.post.id));
  }
}

export default UserService;
