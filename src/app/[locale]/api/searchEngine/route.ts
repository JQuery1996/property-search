import { NextResponse } from "next/server";
import { logger } from "@/lib";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryText = searchParams.get("query_text") || "";

  const apiUrl = `https://engine.propertysearch.website/search?query_text=${encodeURIComponent(
    queryText,
  )}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Authorization": process.env.ENGINE_API_AUTH_TOKEN!, // Use the token securely
      },
      cache: "force-cache", // Cache the response indefinitely
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(JSON.parse(data), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year (forever)
      },
    });
  } catch (error) {
    logger.error("Engine API error:", { error });
    return NextResponse.json({});
  }
}
