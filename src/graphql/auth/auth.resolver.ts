import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { AuthService, UserService } from '../../service';
import { encryptPassword } from '../../utils';
import { generateGraphQLError, GraphQLErrorMessage } from '../error';
import { User } from '../user/user.type';
import { Auth, SignInInput, SignUpInput } from './auth.type';

@Resolver(Auth)
@Service()
class AuthResolver {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Mutation(returns => Auth)
  async signIn(@Arg('signIn') signIn: SignInInput) {
    return {} as User;
  }

  @Mutation(returns => Auth)
  async signUp(@Arg('signUp') signUp: SignUpInput) {
    const { provider, email, password, displayName, profileImageUrl } = signUp;

    // TODO(hoon): provider에 따라서 로직을 타게한다.

    const isExistedUser = await this.userService.isExistedUserByEmail(email);

    if (isExistedUser) {
      return generateGraphQLError(GraphQLErrorMessage.ExistEmail);
    }

    const { passwordSalt, passwordHash } = encryptPassword(password);

    const user = await this.userService.createUser({
      email,
      passwordSalt,
      passwordHash,
      provider,
      displayName,
      profileImageUrl,
    });

    const { accessToken, refreshToken } = await this.authService.getAuthToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}

export default AuthResolver;
