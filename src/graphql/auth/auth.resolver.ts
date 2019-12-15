import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { AuthService, UserService } from '../../service';
import { UserRepository } from '../../database/repository';
import { checkCorrectPassword, encryptPassword } from '../../utils';
import { generateGraphQLError, GraphQLErrorMessage } from '../error';
import { Auth, Provider, SignInInput, SignUpInput, StartSocialAuthInput } from './auth.type';

@Resolver(Auth)
@Service()
class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    @InjectRepository() private readonly userRepository: UserRepository,
  ) {}

  @Mutation(returns => Auth)
  async signIn(@Arg('input') input: SignInInput) {
    const { email, password } = input;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      generateGraphQLError(GraphQLErrorMessage.NotFoundUser);
      return;
    }

    if (user.provider !== Provider.Email) {
      generateGraphQLError(GraphQLErrorMessage.DifferentProvider);
      return;
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

    const isExistedUser = await this.userRepository.isExistedUserByEmail(email);

    if (isExistedUser) {
      generateGraphQLError(GraphQLErrorMessage.ExistEmail);
      return;
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
      generateGraphQLError(GraphQLErrorMessage.DifferentProvider);
      return;
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
