// FILE: dtos/pagination.dto.ts
// _____________________________________________________________________

// Using this interface to validate the query parameters
export interface PaginationDTO {
  page?: number;
  limit?: number;
}
// _____________________________________________________________________