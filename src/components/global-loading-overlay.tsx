"use client";

import { useEffect, useState } from "react";
import { useLoading } from "../providers/loading-provider";

export function GlobalLoadingOverlay() {
  const { isLoading } = useLoading();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShow(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-700 font-medium">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export function ProgressBar() {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(timer);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  }, [isLoading]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

interface PageLoadingWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PageLoadingWrapper({
  children,
  fallback,
}: PageLoadingWrapperProps) {
  const { isLoading } = useLoading();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {fallback || (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading page...</p>
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
