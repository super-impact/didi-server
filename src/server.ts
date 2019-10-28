import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-koa';
import Cors from 'kcors';
import Koa from 'koa';
import BodyParser from 'koa-bodyparser';

import { connectDatabase } from './database/connection';
import graphqlSchema from './graphql';
import logger from './utils/logger';

class Server {
  private app: Koa;
  private apolloServer: ApolloServer;

  constructor() {
    this.app = new Koa();
    this.apolloServer = new ApolloServer({ schema: graphqlSchema });

    this.setMiddlewares();
    this.setApolloServer();
  }

  private setApolloServer() {
    this.apolloServer.applyMiddleware({ app: this.app });
  }

  private setMiddlewares() {
    this.app.use(Cors());
    this.app.use(BodyParser());
  }

  public async runServer(port: string) {
    await connectDatabase();

    this.app.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  }
}

export default Server;
