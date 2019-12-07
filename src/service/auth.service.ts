import { Service } from 'typedi';

import { User } from '../database/entity';
import { generateAccessToken, generateAuthURL, generateRefreshToken, getUserProfileFromCode } from '../utils';

@Service()
class AuthService {
  public async getAuthToken(user: Pick<User, 'id'>) {
    const accessToken = await generateAccessToken({ id: user.id });
    const refreshToken = await generateRefreshToken({ id: user.id });

    return {
      accessToken,
      refreshToken,
    };
  }

  public getGoogleAuthURL() {
    return generateAuthURL();
  }

  public async getUserProfileByGoogle(code: string) {
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
