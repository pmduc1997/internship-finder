// app/api/jobs/[id].ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;

  const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${encodeURIComponent(
    jobId
  )}&country=us`;

  try {
    const res = await fetch(url, {
      headers: {
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY || "", // Use env var for safety
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch job details");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: (error as Error).message },
      { status: 500 }
    );
  }
}
