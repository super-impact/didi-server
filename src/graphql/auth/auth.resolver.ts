import { Mutation, Resolver, Arg } from 'type-graphql';
import { Service } from 'typedi';

import { UserService } from '../../service';
import { User } from '../user/user.type';
import { SignInInput, SignUpInput } from './auth.type';
import { ServiceError, ServiceErrorType } from '../error/ServiceError';

@Resolver(User)
@Service()
class AuthResolver {
  constructor(private userService: UserService) {}

  @Mutation(returns => User)
  async signIn(@Arg('signIn') signIn: SignInInput) {
    return {} as User;
  }

  @Mutation(returns => User)
  async signUp(@Arg('signUpInput') signUpInput: SignUpInput) {
    const { email, password, displayName, profileImageUrl, provider } = signUpInput;
    const isExistEmail = await this.userService.isExistEmail({ email });

    if (isExistEmail) {
      return ServiceError(ServiceErrorType.ExistEmail);
    }

    return this.userService.createUser({ email, password, displayName, profileImageUrl, provider });
  }
}

export default AuthResolver;
