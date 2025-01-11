export interface TFilter {
  page?: number; // Current page number
  per_page?: number; // Number of items per page
  [key: string]: string | number | boolean | undefined; // Other filters
}
