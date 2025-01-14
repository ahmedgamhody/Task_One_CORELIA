import { useRef } from "react";
import BoxHeader from "./Ui/BoxHeader";
import BoxContainer from "./Ui/BoxContainer";
interface IUploadBoxProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  progress: number;
}
export default function UploadBox({
  handleFileChange,
  isUploading,
  progress,
}: IUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  function openUploadWindow() {
    inputRef.current?.click();
  }

  return (
    <>
      <BoxContainer>
        <BoxHeader title="Upload Documents" />
        <div
          role="presentation"
          tabIndex={0}
          className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          onClick={openUploadWindow}
        >
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-image h-8 w-8 text-blue-500 transform -rotate-12"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-text h-8 w-8 text-blue-600 transform rotate-12"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-upload mx-auto h-12 w-12 text-gray-400 mt-6"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-900">
            Drag &amp; drop files here
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Support for PDF, PNG, JPG (up to 10MB)
          </p>

          <div className="mt-4 flex justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file h-5 w-5 text-gray-400"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            </svg>
            <span className="text-sm text-gray-500">Or click to browse</span>

            <input
              type="file"
              className="form-control"
              id="files"
              placeholder="files"
              multiple
              hidden
              ref={inputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </BoxContainer>
      <BoxContainer>
        <BoxHeader title="Processing Status" />
        {isUploading ? (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : (
          <div className="space-y-2 flex flex-col">
            <span className="text-gray-500 text-center block">
              You haven't uploaded anything yet.
            </span>
            <span className="text-gray-800 text-center">
              Click on the Export Results button if you have files to upload.
            </span>
          </div>
        )}
      </BoxContainer>
    </>
  );
}
