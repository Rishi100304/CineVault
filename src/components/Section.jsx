function Section({ title, children, darkMode }) {
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
