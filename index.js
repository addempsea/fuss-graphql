import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './app/graphql';
import Logger from './config/logger';
import { appConfig } from './config';
import { notesDataLoader } from './app/services/notes';
import db from './app/db/setup';

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
const port = process.env.PORT || 3000;
db.connect()
  .then(() => {
    app.listen({ port }, () => {
      logger.info(`🚀🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
  })
  .catch((error) => {
    logger.error(error.message);
    process.exit(1);
  });

export default app;
