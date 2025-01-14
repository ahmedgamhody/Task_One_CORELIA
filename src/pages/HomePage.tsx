import { useState } from "react";
import ExtractedBox from "../components/ExtractedBox";
import BoxContainer from "../components/Ui/BoxContainer";
import Header from "../components/Ui/Header";
import UploadBox from "../components/UploadBox";
import axios from "axios";
import toast from "react-hot-toast";

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [osrResult, setOsrResult] = useState<string | null>(null);
  console.log("osrResult", osrResult);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  // handler
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const itemsAsFiles = event.target.files;
    if (itemsAsFiles) {
      const newFiles = Array.from(itemsAsFiles);
      const maxSize = 10 * 1024 * 1024;
      const validFiles = newFiles.filter((file) => file.size <= maxSize);
      const invalidFiles = newFiles.filter((file) => file.size > maxSize);
      if (invalidFiles.length > 0) {
        toast.error("One or more files exceed the 10MB limit.");
      }
      setFiles((prev) => [...prev, ...validFiles]);
      console.log("Uploaded files:", [...files, ...newFiles]);
    }
  }
  function removeFileHandler(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }
  // Drag-and-drop handlers
  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    const droppedFiles = event.dataTransfer.files;
    const newFiles = Array.from(droppedFiles);
    const maxSize = 10 * 1024 * 1024;
    const validFiles = newFiles.filter((file) => file.size <= maxSize);
    const invalidFiles = newFiles.filter((file) => file.size > maxSize);

    if (invalidFiles.length > 0) {
      toast.error("One or more files exceed the 10MB limit.");
    }

    setFiles((prev) => [...prev, ...validFiles]);
  }
  // export handler
  async function handleExport() {
    setIsUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("docs", file));
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/ocr/?doc_type=ocr&lang=auto`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(progress);
            }
          },
        }
      );
      if (res.data && res.data.osr) {
        setOsrResult(res.data.osr);
      } else {
        setOsrResult("No result available.");
      }
      toast.success("Files uploaded successfully!");
      setFiles([]);
      console.log(res.data);
      if (res.data.osr) {
        console.log(res.data.osr);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error Response:", error.response);
        toast.error(
          error.response?.data?.message || "Upload failed .. Please try again!"
        );
      }
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid grid-cols-1 lg:grid-cols-2 gap-8 flex flex-col-reverse">
          <BoxContainer>
            <ExtractedBox
              files={files}
              handleExport={handleExport}
              isUploading={isUploading}
              removeFileHandler={removeFileHandler}
            />
          </BoxContainer>
          <div className="space-y-6">
            <UploadBox
              handleFileChange={handleFileChange}
              isUploading={isUploading}
              progress={progress}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
