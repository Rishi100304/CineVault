import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  darkMode: boolean;
}

function Section({ title, children, darkMode }: SectionProps) {
  return (
    <div
      className={`
        p-6 rounded-lg shadow-lg transition-colors duration-300 my-2
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
    >
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
export default Section;
