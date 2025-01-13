import { ReactNode } from "react";

interface IBoxProps {
  children: ReactNode;
}
export default function BoxContainer({ children }: IBoxProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {children}
    </div>
  );
}
