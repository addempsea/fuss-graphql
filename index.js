import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './app/graphql';
import Logger from './config/logger';
import { appConfig } from './config';

global.logger = Logger.createLogger({ label: 'FUSS_GRAPHQL' });
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => req
});

appConfig(app, server);

export default app;
