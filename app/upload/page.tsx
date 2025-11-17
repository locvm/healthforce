import FileUpload from "../../components/FileUpload";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center bg-gray-50 rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="material-icons text-white text-2xl">upload</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Upload Your CV</h1>
          <p className="text-gray-600">
            Select a PDF or DOCX file to get started with parsing and optional
            redaction.
          </p>
        </div>
        <FileUpload />
      </div>
    </main>
  );
}
