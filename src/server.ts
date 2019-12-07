import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-koa';
import Cors from 'kcors';
import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import Container from 'typedi';

import { Routes } from './controllers';
import { connectDatabase } from './database/connection';
import graphqlSchema from './graphql';
import { logger } from './utils/logger';

class Server {
  private app: Koa;
  private apolloServer: ApolloServer;
  private router: Router;

  constructor() {
    this.app = new Koa();
    this.router = new Router();
    this.apolloServer = new ApolloServer({ schema: graphqlSchema });
  }

  private setMiddlewares() {
    this.app.use(Cors());
    this.app.use(BodyParser());
  }

  private setRoutes() {
    this.router.use('/api', Container.get(Routes).getRoutes());
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }

  private setApolloServer() {
    this.apolloServer.applyMiddleware({ app: this.app });
  }

  public async runServer(port: string) {
    await connectDatabase();

    this.setMiddlewares();
    this.setRoutes();
    this.setApolloServer();

    this.app.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  }
}

export default Server;
