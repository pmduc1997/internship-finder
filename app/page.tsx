// app/page.tsx
"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

const fetchJobs = async ({ pageParam = 1 }) => {
  const response = await axios.get(`/api/jobs?page=${pageParam}`);
  return response.data;
};

export default function HomePage() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const allJobs = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading jobs.</p>;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Internship Jobs</h1>
      <ul className="space-y-4">
        {allJobs.map((job: any) => (
          <li
            key={job.job_id}
            className="p-5 border rounded-lg shadow-sm hover:shadow transition"
          >
            <Link href={`/job/${job.job_id}`} className="block space-y-1">
              <div className="flex items-center gap-3">
                {job.employer_logo && (
                  <img
                    src={job.employer_logo}
                    alt="Logo"
                    className="w-10 h-10 object-contain"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{job.job_title}</h2>
                  <p className="text-sm text-gray-600">{job.employer_name}</p>
                  <p className="text-sm text-gray-500">{job.job_location}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <div className="text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading more..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
