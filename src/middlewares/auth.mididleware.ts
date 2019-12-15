import { AuthenticationError } from 'apollo-server-koa';
import { Context } from 'koa';
import { ResolverData } from 'type-graphql';

import { verfiyAccessToken } from '../utils';

export type ContextType = {
  ctx: Context;
  token?: {
    id: string;
    iat: Date;
    exp: Date;
    iss: string;
    sub: string;
  };
};

export async function jwtAuthMiddleware(context: ContextType) {
  const accessToken = context.ctx.headers['access-token'];

  if (!accessToken) {
    return context;
  }

  try {
    const decodedAccessToken = verfiyAccessToken(accessToken);

    return {
      ...context,
      token: decodedAccessToken,
    };
  } catch (error) {
    throw AuthenticationError;
  }
}

export async function authChecker(graphql: ResolverData<ContextType>) {
  const { token } = graphql.context;

  if (!token) {
    return false;
  }

  return true;
}
