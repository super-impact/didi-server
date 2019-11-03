import { GraphQLError } from 'graphql';

export enum ServiceErrorType {
  ExistEmail = 'EXIST_EMAIL',
}

export const ServiceError = (message: string) => new GraphQLError(message);
