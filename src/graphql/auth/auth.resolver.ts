import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { AuthService, UserService } from '../../service';
import { checkCorrectPassword, encryptPassword } from '../../utils';
import { generateGraphQLError, GraphQLErrorMessage } from '../error';
import { User } from '../user/user.type';
import { Auth, Provider, SignInInput, SignUpInput } from './auth.type';

@Resolver(Auth)
@Service()
class AuthResolver {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Mutation(returns => Auth)
  async signIn(@Arg('signIn') signIn: SignInInput) {
    const { email, password } = signIn;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return generateGraphQLError(GraphQLErrorMessage.NotFoundUser);
    }

    // TODO(hoon): social auth가 되면 아래 코드를 사용한다.
    if (user.provider !== Provider.Email) {
      return {} as User;
    }

    const isCorrectPassword = checkCorrectPassword(password, user.passwordSalt, user.passwordHash);

    if (!isCorrectPassword) {
      return generateGraphQLError(GraphQLErrorMessage.NotCorrectPassword);
    }

    const { accessToken, refreshToken } = await this.authService.getAuthToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
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
