/* eslint-disable no-unused-vars */
import { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import config from './env';
import { helpers } from '../app/utils';

const {
  ResponseHelper: { errorResponse },
  errorHelper: { notFoundApi }
} = helpers;

const port = config.PORT || 3000;

const appConfig = async (app, server) => {
  app.use(json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined', { stream: logger.stream }));

  server.applyMiddleware({ app, path: '/graphiql' });

  app.use((req, res, next) => {
    next(notFoundApi);
  });
  app.use((err, req, res, next) => errorResponse(req, res, err));

  app.listen({ port }, () => {
    logger.info(`🚀🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

export default appConfig;
