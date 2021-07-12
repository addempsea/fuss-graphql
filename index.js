import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './app/graphql';
import Logger from './config/logger';
import { appConfig } from './config';
import { notesDataLoader } from './app/services/notes';

global.logger = Logger.createLogger({ label: 'FUSS_GRAPHQL' });
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    loaders: {
      notesLoader: notesDataLoader()
    }
  })
});

appConfig(app, server);

export default app;
