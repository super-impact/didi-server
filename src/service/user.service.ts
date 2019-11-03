import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { UserRepository } from '../database/repository';
import { encryption } from '../utils/password.util';

@Service()
class UserService {
  constructor(@InjectRepository() private readonly userRepository: UserRepository) {}

  public async isExistEmail({ email }: { email: string }) {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      return true;
    }

    return false;
  }

  public async createUser({
    email,
    password,
    displayName,
    profileImageUrl,
    provider,
  }: {
    email: string;
    password: string;
    displayName: string;
    profileImageUrl: string;
    provider: string;
  }) {
    const { passwordSalt, passwordHash } = encryption(password);

    return this.userRepository.createUser({
      email,
      passwordSalt,
      passwordHash,
      displayName,
      profileImageUrl,
      provider,
    });
  }
}

export default UserService;
