import React from "react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="cta-panel">
          <article className="prose prose-lg text-gray-800 space-y-6 leading-relaxed">
            <h1 className="font-bold">Privacy Policy</h1>
            <p>
              This privacy policy is a placeholder for the HealthFront demo
              site. No personal data is collected, stored, or transmitted by
              this demo.
            </p>

            <h2 className="font-bold">
              <strong>Information We Would Collect (Demo)</strong>
            </h2>
            <p>
              In a production application we might collect basic contact details
              such as name and email to manage waitlists and notify users. For
              this demo, form submissions are simulated and not sent to any
              server.
            </p>

            <h2 className="font-bold">
              <strong>How We Would Use Information</strong>
            </h2>
            <p>
              In a live product, collected information could be used to
              communicate important updates, launch notifications, and
              occasional product news. This demo does not process or retain any
              personal information.
            </p>

            <h2>
              <strong>Security</strong>
            </h2>
            <p>
              Security practices would include encrypted transport (HTTPS) and
              appropriate access controls. This demo is not representative of a
              production security posture.
            </p>

            <h2>
              <strong>Contact</strong>
            </h2>
            <p>
              This page is a demo-only privacy statement and intentionally
              contains no contact links. Use the site navigation to reach other
              demo pages.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
