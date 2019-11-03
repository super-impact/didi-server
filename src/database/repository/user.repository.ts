import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity';

@Service()
@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findByEmail(email: string) {
    return this.findOne({ email });
  }

  public async createUser({
    email,
    salt,
    hash,
    displayName,
    profileImageUrl,
    provider,
  }: {
    email: string;
    salt: string;
    hash: string;
    displayName: string;
    profileImageUrl: string;
    provider: string;
  }) {
    return this.save({
      email,
      salt,
      hash,
      displayName,
      profileImageUrl,
      provider,
    });
  }
}

export default UserRepository;
