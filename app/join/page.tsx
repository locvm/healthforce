"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function JoinPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    // Simulate network delay so the user believes it's real
    await new Promise((res) => setTimeout(res, 900));

    // In a real app we'd POST to an API here. For demo, just show success.
    setSubmitting(false);
    setSuccess(true);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-6">
      <div className="animate-fade-in w-full">
        <div className="cta-panel w-full max-w-xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Join HealthFront
            </h1>
            <p className="text-gray-700">Be the first to know when we launch</p>
          </div>

          {!success ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              aria-live="polite">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Why are you interested in HealthFront?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? "Sending..." : "Join Waitlist"}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-20 h-20 rounded-full bg-cyan-50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-cyan-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                You're in!
              </h3>
              <p className="text-gray-700 text-center max-w-md">
                Thanks {name ? name.split(" ")[0] : "—"}. We've received your
                request and will notify you when HealthFront launches. This is a
                demo — no data is transmitted.
              </p>
              <div className="flex gap-4 mt-2">
                <Link
                  href="/"
                  className="text-cyan-600 hover:text-cyan-500 font-medium">
                  Back to Home
                </Link>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    setSuccess(false);
                    setName("");
                    setEmail("");
                    setNote("");
                  }}>
                  Submit another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
