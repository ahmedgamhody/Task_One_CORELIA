import { useState } from "react";
import ExtractedBox from "../components/ExtractedBox";
import BoxContainer from "../components/Ui/BoxContainer";
import Header from "../components/Ui/Header";
import UploadBox from "../components/UploadBox";
import axios from "axios";
import toast from "react-hot-toast";

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // handler
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const itemsAsFiles = event.target.files;
    if (itemsAsFiles) {
      const newFiles = Array.from(itemsAsFiles);
      setFiles((prev) => [...prev, ...newFiles]);
      console.log("Uploaded files:", [...files, ...newFiles]);
    }
  }
  async function handleExport() {
    setIsUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await axios.post("http://41.33.149.211:1331/docs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Progress: ${progress}%`);
            setProgress(progress);
          }
        },
      });

      toast.success("Files uploaded successfully!");
      console.log(res.data);
    } catch (error) {
      toast.error("Upload failed .. Please try again!");
      console.error(error);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          <BoxContainer>
            <ExtractedBox
              files={files}
              handleExport={handleExport}
              isUploading={isUploading}
            />
          </BoxContainer>
          <div className="space-y-6">
            <UploadBox
              handleFileChange={handleFileChange}
              isUploading={isUploading}
              progress={progress}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
