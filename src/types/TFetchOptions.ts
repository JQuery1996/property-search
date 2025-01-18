export type TFetchOptions = RequestInit & {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>; // Query parameters
  cache?: RequestCache; // Caching options
};
