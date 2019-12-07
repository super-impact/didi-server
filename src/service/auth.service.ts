import { Service } from 'typedi';

import { Provider } from '../graphql/auth/auth.type';
import { generateAccessToken, generateAuthURL, generateRefreshToken, getUserProfileFromCode } from '../utils';
import UserService from './user.service';

type User = {
  id: string;
  email: string;
  password: string;
  displayName: string;
  profileImageUrl: string;
};

@Service()
class AuthService {
  constructor(private userService: UserService) {}

  public async getAuthToken(user: Pick<User, 'id'>) {
    const { id } = user;

    const accessToken = await generateAccessToken({ id });
    const refreshToken = await generateRefreshToken({ id });

    return {
      accessToken,
      refreshToken,
    };
  }

  public getGoogleAuthURL() {
    return generateAuthURL();
  }

  public async getUserByGoogleAuth(oAuthCode: string) {
    const { email, name, picture } = await this.getUserProfileByGoogle(oAuthCode);
    const foundUser = await this.userService.getUserByEmail(email);

    if (!foundUser) {
      const user = await this.userService.createUser({
        email,
        displayName: name,
        profileImageUrl: picture,
        provider: Provider.Google,
      });

      return user;
    }

    return foundUser;
  }

  private async getUserProfileByGoogle(code: string) {
    const userProfile = await getUserProfileFromCode(code);
    const { email, name, picture } = userProfile.data;

    return {
      email,
      name,
      picture,
    };
  }
}

export default AuthService;
