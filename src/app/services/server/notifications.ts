"use server";
import { fetchInstance } from "@/lib";
import { TFetchOptions, TNotification, TPaginationMetadata } from "@/types";
import { NOTIFICATIONS_URL } from "@/constants";

export async function getNotifications(
  options?: TFetchOptions, // Accept only the options parameter
): Promise<{
  notifications: TNotification[];
  pagination: TPaginationMetadata;
}> {
  try {
    // Use fetchInstance to fetch filter settings
    const response = await fetchInstance<any>(NOTIFICATIONS_URL, {
      ...options, // Spread all options (including params, headers, caching, etc.)
    }); // Return the fetched data

    const { data, ...rest } = response;
    return { notifications: data as TNotification[], pagination: rest };
  } catch (error) {
    console.error("Failed to fetch filter settings", { error });

    return {
      notifications: [],
      pagination: {
        from: 0,
        to: 0,
        total: 0,
        current_page: 0,
        per_page: 0,
      } as TPaginationMetadata,
    };
  }
}
