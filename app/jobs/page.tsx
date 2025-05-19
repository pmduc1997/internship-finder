"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import Pagination from "../components/Pagination";
import { useLanguageStore } from "../lib/store";

const fetchJobs = async (page: number) => {
  const response = await axios.get(`/api/jobs?page=${page}`);
  return response.data;
};

export interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string;
  job_location: string;
}

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { language } = useLanguageStore(); // ✅ use global state

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", page],
    queryFn: () => fetchJobs(page),
  });

  const jobs = data?.data ?? [];

  const translate = (text: Record<"en" | "vi", string>) => text[language];

  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-center">
        {translate({ en: "Internship Jobs", vi: "Việc làm thực tập" })}
      </h1>

      {isLoading ? (
        <p className="text-center">
          {translate({ en: "Loading...", vi: "Đang tải..." })}
        </p>
      ) : error ? (
        <p className="text-center text-red-500">
          {translate({
            en: "Error loading jobs.",
            vi: "Lỗi khi tải danh sách việc làm.",
          })}
        </p>
      ) : (
        <>
          <ul className="grid gap-4 sm:grid-cols-2">
            {jobs.map((job: Job) => (
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
