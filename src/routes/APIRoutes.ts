// FILE: src/routes/APIRoutes.ts
// _____________________________________________________________________

import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
// _____________________________________________________________________

export class ApiRoutes {
  public static router = Router();
  
  // This is a static block in ES2022
  static {
    // This code runs when the class is loaded
    this.initializeRoutes();
  }
  
  // Immediately invoked method to initialize routes
  // This is an alternative to the static block
  // If ES2022 is not supported
  // private static _ = (function() {
  //   ApiRoutes.initializeRoutes();
  // })();
  
  // Custom method to initialize routes
  private static initializeRoutes() {
    // Define the routes for the API
    this.router.get('/', ProductController.findAllWithPagination);
    // Add more routes as needed
  }
}
// _____________________________________________________________________