// app/api/jobs/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  const url = `https://jsearch.p.rapidapi.com/search?query=intern&country=us&page=${page}&num_pages=1`;

  try {
    const res = await fetch(url, {
      headers: {
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await res.json();

    return NextResponse.json({
      data: data.data,
      hasMore: data.data.length > 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: (error as Error).message },
      { status: 500 }
    );
  }
}
