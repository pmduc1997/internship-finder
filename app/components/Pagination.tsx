"use client";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Pagination({
  currentPage,
  hasNextPage,
  onNext,
  onPrevious,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Previous
      </button>

      <span className="text-sm font-medium text-gray-600">
        Page <span className="text-primary font-semibold">{currentPage}</span>
      </span>

      <button
        onClick={onNext}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  );
}
