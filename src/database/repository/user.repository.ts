import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity';

@Service()
@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findById(id: string) {
    return this.findOne({ id });
  }

  public findByEmail(email: string) {
    return this.findOne({ email });
  }

  public async isExistedUserByEmail(email: string) {
    const isExistedUser = await this.findOne({ email });

    return !!isExistedUser;
  }

  public async isExistedUserById(id: string) {
    const isExistedUser = await this.findOne({ id });

    return !!isExistedUser;
  }
}

export default UserRepository;
