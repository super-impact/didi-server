import { GraphQLError } from 'graphql';

export enum GraphQLErrorMessage {
  ExistEmail = 'EXIST_EMAIL',
}

export const generateGraphQLError = (message: string) => new GraphQLError(message);
