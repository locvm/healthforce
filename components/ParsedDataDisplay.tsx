"use client";

interface ParsedDataDisplayProps {
  uploadResult: any;
}

export default function ParsedDataDisplay({
  uploadResult,
}: ParsedDataDisplayProps) {
  if (!uploadResult) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Parsed Resume Data</h3>
      {uploadResult.parsedData?.text && (
        <div className="mb-4">
          <h4 className="font-medium mb-1">Extracted Text:</h4>
          <pre className="text-xs bg-white p-4 rounded border overflow-auto max-h-80 whitespace-pre-wrap">
            {uploadResult.parsedData.text}
          </pre>
        </div>
      )}
      {uploadResult.parsedData ? (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {uploadResult.parsedData.name || "Not found"}
          </p>
          <p>
            <strong>Emails:</strong>{" "}
            {uploadResult.parsedData.emails?.length
              ? uploadResult.parsedData.emails.join(", ")
              : "Not found"}
          </p>
          <p>
            <strong>Phones:</strong>{" "}
            {uploadResult.parsedData.phones?.length
              ? uploadResult.parsedData.phones.join(", ")
              : "Not found"}
          </p>
          <p>
            <strong>Socials:</strong>{" "}
            {uploadResult.parsedData.socials?.length
              ? uploadResult.parsedData.socials.join(", ")
              : "Not found"}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {uploadResult.parsedData.address || "Not found"}
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            {uploadResult.parsedData.skills?.join(", ") || "Not found"}
          </p>
          <p>
            <strong>Education:</strong>{" "}
            {uploadResult.parsedData.education?.join("; ") || "Not found"}
          </p>
          <p>
            <strong>Experience:</strong>{" "}
            {uploadResult.parsedData.experience?.join("; ") || "Not found"}
          </p>
        </div>
      ) : (
        <p className="text-red-600">{uploadResult.error || "No data parsed"}</p>
      )}
    </div>
  );
}
