import { GraphQLError } from 'graphql';

export enum GraphQLErrorMessage {
  ExistEmail = 'EXIST_EMAIL',
  NotFoundUser = 'NOT_FOUND_USER',
  NotCorrectPassword = 'NOT_CORRECT_PASSWORD',
  DifferentProvider = 'DIFFERENT_PROVIDER',
  ExistPost = 'EXIST_POST',
  ExistPostLike = 'EXIST_POST_LIKE',
  IsNotExistUser = 'IS_NOT_EXIST_USER',
  IsNotExistPost = 'IS_NOT_EXIST_POST',
}

export const generateGraphQLError = (message: string) => {
  throw new GraphQLError(message);
};
