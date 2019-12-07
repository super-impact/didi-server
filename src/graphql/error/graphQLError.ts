import { GraphQLError } from 'graphql';

export enum GraphQLErrorMessage {
  ExistEmail = 'EXIST_EMAIL',
  NotFoundUser = 'NOT_FOUND_USER',
  NotCorrectPassword = 'NOT_CORRECT_PASSWORD',
  DifferentProvider = 'DIFFERENT_PROVIDER',
}

export const generateGraphQLError = (message: string) => {
  throw new GraphQLError(message);
};
