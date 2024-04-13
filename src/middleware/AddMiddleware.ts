// FILE: middleware/AddMiddleware.ts
// _____________________________________________________________________

import {
  ExpNextCallback,
  ExpRequest,
  ExpResponse,
} from '../common/types/express-name-mappers';
import { HttpStatus } from '../common/types/http-status';
// _____________________________________________________________________

type MiddlewareErrorParams = {
  err: Error,
  req?: ExpRequest,
  res: ExpResponse,
  next: ExpNextCallback
}
// _____________________________________________________________________

export class AddMiddleware {
  
  static middlewareErrorHandler() {
    /**
     * Handles errors in Express routes by responding with an HTTP 500 status and the error message.
     *
     * @remarks
     * This middleware function is part of the Express error handling mechanism. It's designed
     * to format and return error responses to the client, ensuring a consistent error handling strategy.
     *
     * @param params - An object containing:
     *  - `err`: The encountered error.
     *  - `req`: The HTTP request object (optional, unused here but required for signature).
     *  - `res`: The HTTP response object, used to send the formatted error response.
     *  - `next`: Callback to pass control to the next middleware.
     */
    return (params: MiddlewareErrorParams) => {
      
      params.res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: params.err?.message });
      
      params.next();
    };
  }
}
// _____________________________________________________________________