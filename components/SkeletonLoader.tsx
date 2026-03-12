"use client";

interface SkeletonLoaderProps {
  type?: "card" | "text" | "image" | "list";
  className?: string;
}

export default function SkeletonLoader({ type = "card", className = "" }: SkeletonLoaderProps) {
  if (type === "card") {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden animate-pulse ${className}`}>
        <div className="h-64 bg-gray-200"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    );
  }

  if (type === "image") {
    return (
      <div className={`bg-gray-200 rounded-lg animate-pulse ${className}`} style={{ aspectRatio: "16/9" }}></div>
    );
  }

  if (type === "list") {
    return (
      <div className={`space-y-4 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4 animate-pulse">
            <div className="h-12 w-12 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}












