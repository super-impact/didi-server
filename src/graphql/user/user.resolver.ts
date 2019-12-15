import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { ContextType } from '../../middlewares/auth.mididleware';
import { UserService } from '../../service';
import { User } from './user.type';

@Resolver(User)
@Service()
class UserResolver {
  constructor(private userService: UserService) {}

  @Authorized()
  @Query(returns => User)
  async myUser(@Ctx() context: ContextType) {
    const { id } = context.token;

    return this.userService.getUser({ id });
  }
}

export default UserResolver;
