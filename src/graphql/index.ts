import { gql, makeExecutableSchema, mergeSchemas } from 'apollo-server-koa';
import { GraphQLDate } from 'graphql-iso-date';
import { merge } from 'lodash';
import { buildSchemaSync } from 'type-graphql';
import { Container } from 'typedi';

const ScalaraTypes = gql`
  scalar Date
`;

const scalarResolvers = {
  Date: GraphQLDate,
};

const graphqlSchemaFromApollo = makeExecutableSchema({
  typeDefs: [ScalaraTypes],
  resolvers: merge(scalarResolvers),
});

const graphqlSchemaFromTypeGraphql = buildSchemaSync({
  resolvers: [`${__dirname}/**/*.resolver.{ts,js}`],
  validate: false,
  container: Container,
});

const graphqlSchema = mergeSchemas({
  schemas: [graphqlSchemaFromApollo, graphqlSchemaFromTypeGraphql],
});

export default graphqlSchema;
