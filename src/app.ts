import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';

import {
  SERVER_ALLOWED_ORIGIN,
  SERVER_BASE_PATH,
  SERVER_PORT,
} from './config/environment';
import activateUserAccountController from './Controller/activateUserAccount.controller';
import changelogController from './Controller/changelog.controller';
import apolloServer from './graphql/apolloServer.graphql';
import xss from './middleware/cleanXss.middleware';
import {connectRedis} from './services';
import {initLogger, logger} from './services/logger.service';
import initDbConnection from './services/mongoDbConnection.service';
import {client} from './services/prometheus.service';
import logWelcome from './util/logWelcome';

async function runServer() {
  initLogger();

  await connectRedis();
  const connectionStatus = await initDbConnection();
  if (connectionStatus !== 1)
    throw new Error('🔥 Loaders are not ready! please check log file');

  const app = express();
  app.disable('x-powered-by');
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || SERVER_ALLOWED_ORIGIN.includes(origin)) {
          callback(null, true);
          return;
        }
        const error = new Error(
          `Origin ${origin} has been blocked by CORS policy`
        );
        logger.error(error);
        callback(error, origin);
      },
      credentials: true,
    })
  );

  app.use(helmet({contentSecurityPolicy: false}));
  app.use(xss());
  app.set('view engine', 'handlebars');
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: `${SERVER_BASE_PATH}/graphql`,
    cors: false,
  });
  app.get('/changelog', changelogController);
  // ! Temporarily for testing.
  app.get('/activate-user', activateUserAccountController);

  app.use('/metrics', async (_, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  });

  // Checking server availability
  app.use('/', async (_, res) => {
    res.send({message: 'System is healthy'});
    res.end();
  });

  const httpServer = http.createServer(app);

  httpServer.listen(SERVER_PORT, logWelcome);
}

runServer();

export default {};
