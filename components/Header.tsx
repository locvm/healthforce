import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="glass-card border-b border-gray-200/50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse">
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative max-w-6xl mx-auto flex items-center justify-between py-8 px-6">
        <div className="flex items-center gap-4">
          {/* Logo with icon */}
          <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <Link
            href="/"
            className="text-gray-900 font-bold text-3xl tracking-tight">
            HealthFront
          </Link>
        </div>
        {/* Right side coming soon badge */}
        <div className="flex items-center">
          <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            Coming Soon
          </div>
        </div>
      </div>
    </header>
  );
}
