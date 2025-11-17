"use client";

import { useRef, useState } from "react";
import ParsedDataDisplay from "./ParsedDataDisplay";
import RedactedImageDisplay from "./RedactedImageDisplay";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{
    step: string;
    percent: number;
  } | null>(null);
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
    setIsProcessing(true);
    setProgress({ step: "Starting...", percent: 0 });

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || ''; // Keep incomplete line

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.result) {
                  setUploadResult(data.result);
                  setProgress(null);
                } else {
                  setProgress({ step: data.step, percent: data.percent });
                }
              } catch (e) {
                console.error('Failed to parse progress:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadResult({
        error: "Upload failed",
        details: (error as Error).message,
      });
      setProgress(null);
    } finally {
      setIsProcessing(false);
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
      {isProcessing && progress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="material-icons text-blue-600 mr-2 animate-spin">
              refresh
            </span>
            <p className="text-sm text-blue-800">{progress.step}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.percent}%` }}></div>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            {progress.percent}% complete
          </p>
        </div>
      )}
      <ParsedDataDisplay uploadResult={uploadResult} />
      <RedactedImageDisplay uploadResult={uploadResult} />
    </div>
  );
}
