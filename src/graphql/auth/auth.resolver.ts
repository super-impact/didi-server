import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { AuthService, UserService } from '../../service';
import { checkCorrectPassword, encryptPassword } from '../../utils';
import { generateGraphQLError, GraphQLErrorMessage } from '../error';
import { Auth, Provider, SignInInput, SignUpInput, StartSocialAuthInput } from './auth.type';

@Resolver(Auth)
@Service()
class AuthResolver {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Mutation(returns => Auth)
  async signIn(@Arg('input') input: SignInInput) {
    const { email, password } = input;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return generateGraphQLError(GraphQLErrorMessage.NotFoundUser);
    }

    if (user.provider !== Provider.Email) {
      return generateGraphQLError(GraphQLErrorMessage.DifferentProvider);
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
  async signUp(@Arg('input') input: SignUpInput) {
    const { email, password, displayName, profileImageUrl } = input;

    const isExistedUser = await this.userService.isExistedUserByEmail(email);

    if (isExistedUser) {
      return generateGraphQLError(GraphQLErrorMessage.ExistEmail);
    }

    const { passwordSalt, passwordHash } = encryptPassword(password);

    const newUser = await this.userService.createUser({
      email,
      passwordSalt,
      passwordHash,
      displayName,
      profileImageUrl,
      provider: Provider.Email,
    });

    const { accessToken, refreshToken } = await this.authService.getAuthToken(newUser);

    return {
      user: newUser,
      accessToken,
      refreshToken,
    };
  }

  @Mutation(returns => Auth)
  async startSocialAuth(@Arg('input') input: StartSocialAuthInput) {
    const { provider, oAuthCode } = input;

    const user = await this.authService.getUserByGoogleAuth(oAuthCode);

    if (user.provider !== provider) {
      return generateGraphQLError(GraphQLErrorMessage.DifferentProvider);
    }

    const { accessToken, refreshToken } = await this.authService.getAuthToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}

export default AuthResolver;
