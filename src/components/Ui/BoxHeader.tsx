interface IBoxHeaderProps {
  title: string;
}
export default function BoxHeader({ title }: IBoxHeaderProps) {
  return (
    <div dir="rtl">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
        {title}
      </h2>
    </div>
  );
}
