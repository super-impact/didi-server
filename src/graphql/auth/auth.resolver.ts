import { Mutation, Resolver, Args } from 'type-graphql';
import { Service } from 'typedi';
import { randomFillSync, scryptSync } from 'crypto';

import { UserService } from '../../service';
import { User } from '../user/user.type';
import { SignInArgs, SignUpArgs } from './auth.type';
import { from } from 'apollo-link';

@Resolver(User)
@Service()
class AuthResolver {
  constructor(private userService: UserService) {}

  @Mutation(returns => User)
  async signIn(@Args() signIn: SignInArgs) {
    return {} as User;
  }

  @Mutation(returns => User)
  async signUp(@Args() { email, password, displayName, profileImageUrl, provider }: SignUpArgs) {
    const salt = randomFillSync(Buffer.alloc(64)).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');

    return this.userService.createUser({ email, salt, hash, displayName, profileImageUrl, provider });
  }
}

export default AuthResolver;
