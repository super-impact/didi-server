import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { User } from '../database/entity';
import { UserRepository } from '../database/repository';
import { generateGraphQLError, GraphQLErrorMessage } from '../graphql/error';

@Service()
class UserService {
  constructor(@InjectRepository() private readonly userRepository: UserRepository) {}

  public async isExistedUserByEmail(email: string) {
    const isExistedUser = await this.userRepository.findByEmail(email);
    return !!isExistedUser;
  }

  public async createUser(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  public async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  public async getUser(user: Pick<User, 'id'>) {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      generateGraphQLError(GraphQLErrorMessage.NotFoundUser);
      return;
    }

    return foundUser;
  }
}

export default UserService;
