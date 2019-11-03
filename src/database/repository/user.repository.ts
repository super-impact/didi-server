import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity';

@Service()
@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findByEmail(email: string) {
    return this.findOne({ email });
  }

  public async createUser(user: Partial<User>) {
    return this.save(user);
  }
}

export default UserRepository;
