import { Context } from 'koa';
import { Service } from 'typedi';

import { Provider } from '../graphql/auth/auth.type';
import { AuthService, UserService } from '../service';

@Service()
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  public getOAuthURL = async (context: Context) => {
    const { provider } = context.params;

    if (provider === Provider.Google) {
      context.redirect(this.authService.getGoogleAuthURL());
      return;
    }

    context.status = 404;
    context.body = {
      message: 'Not found provider',
    };

    return;
  };
}
