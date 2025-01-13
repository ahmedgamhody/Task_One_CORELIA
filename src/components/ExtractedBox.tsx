import BoxHeader from "./Ui/BoxHeader";

interface IExtractedBoxProps {
  files: File[];
  handleExport: () => void;
  isUploading?: boolean;
}
export default function ExtractedBox({
  files,
  handleExport,
}: IExtractedBoxProps) {
  const filesRender = files?.map((file, index) => {
    const fileType = file.type.split("/")[0];
    return (
      <li
        className="mb-2 cursor-pointer rounded-xl shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow flex items-center justify-between"
        key={index}
      >
        {index + 1} -<span>{file.name}</span>
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
            files.length === 0 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleExport}
          disabled={files.length === 0}
        >
          Export Results
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
