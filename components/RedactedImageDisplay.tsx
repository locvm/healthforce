"use client";

interface RedactedImageDisplayProps {
  uploadResult: any;
}

export default function RedactedImageDisplay({
  uploadResult,
}: RedactedImageDisplayProps) {
  if (!uploadResult?.parsedData?.redactedImageBase64) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Redacted CV Image</h3>
      <img
        src={`data:image/png;base64,${uploadResult.parsedData.redactedImageBase64}`}
        alt="Redacted CV"
        className="max-w-full border rounded"
      />
    </div>
  );
}
