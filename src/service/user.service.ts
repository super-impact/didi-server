import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { User } from '../database/entity';
import { UserRepository } from '../database/repository';

@Service()
class UserService {
  constructor(@InjectRepository() private readonly userRepository: UserRepository) {}

  public async userEmailExist(user: User) {
    return !!this.userRepository.findByEmail(user.email);
  }
}

export default UserService;
