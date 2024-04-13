// FILE: main.ts
// _____________________________________________________________________

import { json } from 'express';
import { envs } from './config/envs';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { AddMiddleware } from './middleware/AddMiddleware';
import { ApiRoutes } from './routes/APIRoutes';
import { AppService } from './services/AppService';
// _____________________________________________________________________

const main = async () => {
  const app = express();
  const port = envs.port;
  
  /** ----------------------------------------------------------------------- */
  /**                              MIDDLEWARE                                 */
  /** ----------------------------------------------------------------------- */
  // Middleware
  app.use(morgan('tiny'));
  app.use(json());
  app.use(cors());
  
  /** ----------------------------------------------------------------------- */
  /**                              API-ROUTES                                 */
  /** ----------------------------------------------------------------------- */
  // Mount the static router with a base path
  app.use('/products', ApiRoutes.router);
  
  // Error handling middleware
  app.use(AddMiddleware.middlewareErrorHandler());
  
  /** ----------------------------------------------------------------------- */
  /**                              SERVER/DATABASE                            */
  /** ----------------------------------------------------------------------- */
  await AppService.startServer(app, port);
};
// _____________________________________________________________________

main()
  .catch((err: unknown): void => {
    if (err instanceof Error)
      console.error('Failed to start server:', err.message);
    // Re-throw the error for further handling
    throw err;
  });
// _____________________________________________________________________













