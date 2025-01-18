// utils/fetchInstance.ts
import { BASE_URL } from "@/constants";
import { TFetchOptions } from "@/types";
import { logger } from "@/lib"; // Import your logger

type Interceptor = (options: TFetchOptions) => TFetchOptions;

const requestInterceptors: Interceptor[] = [];
const responseInterceptors: ((response: Response) => Response)[] = [];

export function addRequestInterceptor(interceptor: Interceptor) {
  requestInterceptors.push(interceptor);
}

export function addResponseInterceptor(
  interceptor: (response: Response) => Response,
) {
  responseInterceptors.push(interceptor);
}

export async function fetchInstance<T>(
  endpoint: string,
  options: TFetchOptions = {},
): Promise<T> {
  // Convert params object to query string
  const queryString = options.params
    ? `?${new URLSearchParams(
        Object.entries(options.params).reduce(
          (acc, [key, value]) => {
            acc[key] = String(value); // Ensure all values are strings
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString()}`
    : "";

  const url = `${BASE_URL}${endpoint}${queryString}`;

  // Apply request interceptors
  let fetchOptions = options;
  for (const interceptor of requestInterceptors) {
    fetchOptions = interceptor(fetchOptions);
  }

  // Default headers
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  // Merge options with defaults
  fetchOptions = {
    ...fetchOptions,
    headers,
    cache: options.cache || "default", // Use the provided cache option or default
  };

  try {
    let response = await fetch(url, fetchOptions);

    // Apply response interceptors
    for (const interceptor of responseInterceptors) {
      response = interceptor(response);
    }

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    // Parse and return the response data
    const data = await response.json();
    return data.data as T;
  } catch (error) {
    // Log the error using your logger
    logger.error("API Error:", { error });
    throw error; // Re-throw the error for further handling
  }
}
