// FILE: controllers/product.controller.ts
// _____________________________________________________________________

import { PaginationDTO } from '../common/dtos/pagination.dto';
import {
  ExpNextCallback,
  ExpRequest,
  ExpResponse,
} from '../common/types/express-name-mappers';
import { PrismaClient } from '@prisma/client';
// _____________________________________________________________________

const prisma = new PrismaClient(); // Instantiate PrismaClient

export class ProductController {
  
  static async findAllWithPagination(req: ExpRequest, res: ExpResponse, nextCallback: ExpNextCallback) {
    const { page, limit } = req.query as unknown as PaginationDTO;
    
    // Ensure 'page' and 'limit' are valid,
    // positive numbers and not fewer than `1`
    const validatedPage: number = Math.max(1, Number(page));
    // Ensures limit is positive, preventing division by zero
    const validatedLimit: number = Math.max(1, Number(limit));
    
    // Count the total number of products in the database for pagination
    const totalItems: number = await prisma.product.count();
    // Calculating the last page number based on total items and items per page
    const totalPages: number = Math.ceil(totalItems / validatedLimit);
    
    // Calculate the offset for the database query based on the current page
    const paginationSkipPages: number = (validatedPage - 1) * validatedLimit;
    
    // Retrieving a specific subset of products based on the page number.
    // Limit 'skip' determines how many products to bypass, which is
    // calculated based on the current page and limit 'take' specifies the
    // maximum number of products returned by the query
    const responseData = await prisma.product.findMany({
      skip: paginationSkipPages,
      take: Number(limit),
    });
    
    // The number of items currently displayed on the page,
    // which will be equal to the response data length
    const itemsPerPage: number = responseData.length;
    
    const response = {
      data: responseData,
      metadata: {
        // Total number of pages available, based on the `page` count and `limit`
        totalPages: totalPages,
        // The currently requested page
        currentPage: Number(page),
        // The last available page is the sum of all pages,
        // clarifying it's the end of the data set
        lastPage: totalPages,
        itemsPerPage: itemsPerPage,
      },
    };
    
    // In an Express.js controller, rather than "returning" the response
    // in the same way you might return a value from a regular function,
    // you should use the response (res) object provided by Express to send
    // the response back to the client directly. This is because handling HTTP
    // requests in Express involves side effects (like sending HTTP responses
    // to the client), which don't fit the pure function model where you return values.
    res.json(response);
  }
}
// _____________________________________________________________________











