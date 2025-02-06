// utils/fetchInstance.ts
import { BASE_URL } from "@/constants";
import { TFetchOptions } from "@/types";
import { logger } from "@/lib"; // Import your logger
import { cookies } from "next/headers"; // ✅ Import Next.js cookies

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
  // ✅ Get token from cookies (Server-side)
  const token = cookies().get("token")?.value;
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

  // ✅ If token exists, add it to headers
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  // Merge options with defaults
  fetchOptions = {
    ...fetchOptions,
    headers,
  };

  // Handle cache and next.revalidate conflict
  if (fetchOptions.next?.revalidate) {
    // If next.revalidate is provided, remove the cache option
    delete fetchOptions.cache;
  } else {
    // If next.revalidate is not provided, use the cache option (default to "default")
    fetchOptions.cache = fetchOptions.cache || "default";
  }

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
