import { Service } from 'typedi';

import { User } from '../database/entity';
import { generateAccessToken, generateRefreshToken } from '../utils';

@Service()
class AuthService {
  constructor() {}

  public async getAuthToken(user: Pick<User, 'id'>) {
    const accessToken = await generateAccessToken({ id: user.id });
    const refreshToken = await generateRefreshToken({ id: user.id });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default AuthService;
