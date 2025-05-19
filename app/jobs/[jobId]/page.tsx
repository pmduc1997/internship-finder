"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";

const fetchJobDetails = async (jobId: string) => {
  const response = await axios.get(`/api/jobs/${jobId}`);
  return response.data.data[0]; // The job detail object
};

export default function JobDetailPage() {
  const { jobId } = useParams();

  const {
    data: job,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJobDetails(jobId as string),
    enabled: !!jobId,
  });

  if (isLoading) return <p className="p-6">Loading job details...</p>;
  if (error || !job)
    return <p className="p-6 text-red-500">Failed to load job details.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-gray-100">
        <div className="flex items-start gap-4">
          {job.employer_logo && (
            <img
              src={job.employer_logo}
              alt="Employer Logo"
              className="w-16 h-16 object-contain rounded border"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {job.job_title}
            </h1>
            <p className="text-sm text-gray-600">{job.employer_name}</p>
            <p className="text-sm text-gray-500">{job.job_location}</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-primary">
            Job Description
          </h2>
          <p className="whitespace-pre-line text-gray-700 text-sm leading-relaxed">
            {job.job_description}
          </p>
        </div>

        {job.job_apply_link && (
          <a
            href={job.job_apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
          >
            Apply Now
          </a>
        )}
      </div>
    </div>
  );
}
