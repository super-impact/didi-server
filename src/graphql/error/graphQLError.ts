import { GraphQLError } from 'graphql';

export enum GraphQLErrorMessage {
  ExistEmail = 'EXIST_EMAIL',
  NotFoundUser = 'NOT_FOUND_USER',
  NotCorrectPassword = 'NOT_CORRECT_PASSWORD',
  DifferentProvider = 'DIFFERENT_PROVIDER',
  ExistPost = 'EXIST_POST',
  ExistPostLike = 'EXIST_POST_LIKE',
  NotFoundPost = 'NOT_FOUND_POST',
  NoPermission = 'NO_PERMISSION',
}

export const generateGraphQLError = (message: string) => {
  throw new GraphQLError(message);
};
