export interface ISearchParams {
  page?: string; // Current page number
  per_page?: string; // Number of items per page
  [key: string]: string | number | boolean | undefined; // Other filters
}
