// app/job/[jobId]/page.tsx
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

  if (isLoading) return <p>Loading job details...</p>;
  if (error || !job) return <p>Failed to load job details.</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{job.job_title}</h1>
      <p className="text-sm text-gray-600">{job.employer_name}</p>
      <p className="text-sm text-gray-500">{job.job_location}</p>

      {job.employer_logo && (
        <img src={job.employer_logo} alt="Employer Logo" className="w-32" />
      )}

      <p className="whitespace-pre-line">{job.job_description}</p>

      {job.job_apply_link && (
        <a
          href={job.job_apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Apply Now
        </a>
      )}
    </div>
  );
}
