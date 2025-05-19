"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import Pagination from "../components/Pagination";

const fetchJobs = async (page: number) => {
  const response = await axios.get(`/api/jobs?page=${page}`);
  return response.data;
};

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState<"en" | "vn">("en");

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", page],
    queryFn: () => fetchJobs(page),
  });

  const jobs = data?.data ?? [];
  const hasNext = data?.hasMore;
  const hasPrev = page > 1;

  const translate = (text: Record<"en" | "vn", string>) => text[language];

  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-center">
        {translate({ en: "Internship Jobs", vn: "Việc làm thực tập" })}
      </h1>

      {isLoading ? (
        <p className="text-center">
          {translate({ en: "Loading...", vn: "Đang tải..." })}
        </p>
      ) : error ? (
        <p className="text-center text-red-500">
          {translate({
            en: "Error loading jobs.",
            vn: "Lỗi khi tải danh sách việc làm.",
          })}
        </p>
      ) : (
        <>
          <ul className="grid gap-4 sm:grid-cols-2">
            {jobs.map((job: any) => (
              <li
                key={job.job_id}
                className="bg-white rounded-xl p-5 border border-gray-200 shadow hover:shadow-md transition"
              >
                <Link href={`/jobs/${job.job_id}`} className="block space-y-2">
                  <div className="flex items-center gap-3">
                    {job.employer_logo && (
                      <img
                        src={job.employer_logo}
                        alt="Logo"
                        className="w-10 h-10 object-contain rounded"
                      />
                    )}
                    <div>
                      <h2 className="text-primary font-semibold">
                        {job.job_title}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {job.employer_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {job.job_location}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={page}
            hasNextPage={data?.hasMore}
            onNext={() => setPage((prev) => prev + 1)}
            onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
          />
        </>
      )}
    </main>
  );
}
