import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { UserService } from '../../service';
import { User } from '../user/user.type';
import { SignInInput, SignUpInput } from './auth.type';

@Resolver(User)
@Service()
class AuthResolver {
  constructor(private userService: UserService) {}

  @Mutation(returns => User)
  async signIn(@Arg('signIn') signIn: SignInInput) {
    return {} as User;
  }

  @Mutation(returns => User)
  async signUp(@Arg('signUp') signUp: SignUpInput) {
    return {} as User;
  }
}

export default AuthResolver;
