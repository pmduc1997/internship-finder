"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/jobs?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col flex-grow justify-center items-center text-center px-4 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-2xl w-full z-10">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-blue-600 mb-6 animate-fade-in">
          Find your internship, build your future.
        </h1>

        <p className="text-gray-600 text-lg mb-8 animate-fade-in-delay">
          Try searching for <em>marketing intern in Ha Noi</em> or{" "}
          <em>developer remote</em>.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
          <input
            type="text"
            placeholder="e.g. marketing intern in Ho Chi Minh"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-[28rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105"
          >
            🚀 Let’s Go
          </button>
        </div>
      </div>

      {/* Optional animated background blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-400 z-10">
        Built with 💙 by Internly team
      </footer>
    </div>
  );
}
