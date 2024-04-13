// FILE: services/AppService.ts
// _____________________________________________________________________

import { PrismaClient } from '@prisma/client';
import { Express } from 'express';
import { formattedHostAddress } from '../common/loggers/host-address-logger';
import { envs } from '../config/envs';
// _____________________________________________________________________

export class AppService {
  
  /**
   * Initializes the database connection using Prisma.
   *
   * @returns The PrismaClient instance after successfully connecting to the database.
   * @throws Error if the database connection fails.
   */
  static async initializeDatabase() {
    const optionArgs = {
      datasources: {
        db: {
          url: envs.databaseURL,
        },
      },
    };
    
    const prisma = new PrismaClient(optionArgs);
    
    try {
      await prisma.$connect();
      console.log('Database connected successfully.');
      return prisma;
    } catch (err: unknown) {
      // Type assertion to Error
      if (err instanceof Error) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit if database connection fails
      }
    }
  };
  // _____________________________________________________________________
  
  static async startServer(app: Express, port: number) {
    // Await database initialization before starting the server.
    await this.initializeDatabase();
    try {
      // Start the server
      app.listen(port, () => {
        console.log(formattedHostAddress(port));
      });
    } catch (err: unknown) {
      // Type assertion to Error
      if (err instanceof Error) {
        console.error('[ERROR] could not connect to server:', err.message);
        process.exit(1); // Exit if database connection fails
      }
    }
  };
}
// _____________________________________________________________________