import { GraphQLError } from 'graphql';

export enum GraphQLErrorMessage {
  ExistEmail = 'EXIST_EMAIL',
  NotFoundUser = 'NOT_FOUND_USER',
  NotCorrectPassword = 'NOT_CORRECT_PASSWORD',
}

export const generateGraphQLError = (message: string) => new GraphQLError(message);
