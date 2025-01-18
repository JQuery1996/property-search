export interface ISearchParams {
  page?: string | number; // Current page number
  per_page?: string | number; // Number of items per page
  [key: string]: any; // Other filters
}
