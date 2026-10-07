import { createContext, useState, type PropsWithChildren } from "react";

interface ThemeContextType {
    darkMode: boolean;
    ToggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [darkMode, setDarkMode] = useState(false);

  const ToggleTheme = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeContext.Provider value={{ darkMode, ToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeContext };