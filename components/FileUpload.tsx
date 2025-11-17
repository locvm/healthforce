"use client";

import { useRef, useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = async (selectedFile: File) => {
    setFile(selectedFile);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      console.log("Upload result:", result);
      setUploadResult(result);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadResult({
        error: "Upload failed",
        details: (error as Error).message,
      });
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.name.endsWith(".docx"))
    ) {
      processFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragOver
            ? "border-cyan-500 bg-cyan-50"
            : "border-gray-300 hover:border-cyan-400"
        }`}>
        <div className="text-4xl mb-4 text-gray-400">
          <span className="material-icons">cloud_upload</span>
        </div>
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drag & drop your CV here
        </p>
        <p className="text-sm text-gray-500 mb-4">or click to browse</p>
        <p className="text-xs text-gray-400">Supports DOCX files</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        className="hidden"
      />
      {file && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="material-icons text-green-600 mr-2">
              check_circle
            </span>
            <p className="text-sm text-green-800">
              File uploaded: <span className="font-medium">{file.name}</span>
            </p>
          </div>
        </div>
      )}
      {uploadResult && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Parsed Resume Data</h3>
          {uploadResult.parsedData ? (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong>{" "}
                {uploadResult.parsedData.name || "Not found"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {uploadResult.parsedData.email || "Not found"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {uploadResult.parsedData.phone || "Not found"}
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
            <p className="text-red-600">
              {uploadResult.error || "No data parsed"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
