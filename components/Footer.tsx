import React from "react";

export default function Footer() {
  return (
    <footer className="relative mt-16 bg-transparent">
      {/* 1px solid bar at very top (no gradient) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-cyan-900" />
      <div className="max-w-6xl mx-auto py-8 px-4 text-sm text-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <nav className="flex items-center justify-center md:justify-start gap-6">
            <a
              href="/privacy"
              className="text-gray-700 hover:text-cyan-600 transition-all duration-200 font-medium">
              Privacy Policy
            </a>
            <span className="text-gray-300 hidden md:inline">•</span>
            <a
              href="/join"
              className="text-gray-700 hover:text-cyan-600 transition-all duration-200 font-medium">
              Contact
            </a>
          </nav>

          <div className="text-center md:text-left">
            <div className="text-gray-800 font-semibold text-base">
              Empowering doctors, together. &mdash; HealthFront
            </div>
          </div>

          <div className="text-center md:text-right text-gray-500 text-xs">
            © 2025 HealthFront. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
