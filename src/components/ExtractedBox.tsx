import BoxHeader from "./Ui/BoxHeader";

interface IExtractedBoxProps {
  files: File[];
  handleExport: () => void;
  isUploading?: boolean;
  removeFileHandler?: (index: number) => void;
}
export default function ExtractedBox({
  files,
  handleExport,
  isUploading,
  removeFileHandler,
}: IExtractedBoxProps) {
  const filesRender = files?.map((file, index) => {
    const fileType = file.type.split("/")[0];
    return (
      <li
        className="mb-2 cursor-pointer rounded-xl shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow flex items-center justify-between"
        key={index}
      >
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-1
           focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-red-600
            dark:hover:bg-red-700 dark:focus:ring-red-900 transition-all duration-200"
          onClick={() => removeFileHandler && removeFileHandler(index)}
        >
          Remove
        </button>
        <span>{file.name}</span>
        <span>
          {fileType === "image" ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              width="50px"
              height="50px"
              className="rounded-md"
            />
          ) : file.type === "application/pdf" ? (
            <div className="flex items-center gap-2">
              <a
                href={URL.createObjectURL(file)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-blue-500 transition underline"
              >
                View PDF
              </a>
              <iframe
                src={URL.createObjectURL(file)}
                width="45px"
                height="45px"
                className="border rounded-md"
                title={file.name}
              ></iframe>
            </div>
          ) : (
            <span className="text-gray-500">Unsupported file</span>
          )}
        </span>
      </li>
    );
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          className={`text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 ${
            (files.length === 0 || isUploading) &&
            "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleExport}
          disabled={files.length === 0 || isUploading}
        >
          {isUploading ? (
            <span className="flex items-center gap-2">
              Uploading...{" "}
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-200 animate-spin dark:text-blue-900 fill-white me-800"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </span>
          ) : (
            <>
              Export Results{" "}
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
                className="lucide lucide-download h-4 w-4 ml-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
            </>
          )}
        </button>
        <BoxHeader title="Extracted Data" />
      </div>
      {files.length === 0 ? (
        <div className="text-center py-12">
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
            className="lucide lucide-file-text h-12 w-12 text-gray-400 mx-auto mb-4"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            <path d="M10 9H8"></path>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
          </svg>
          <p className="text-gray-500">
            Upload a document to see extracted data
          </p>
        </div>
      ) : (
        <ul>{filesRender}</ul>
      )}
    </>
  );
}
