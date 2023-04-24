import { createContext, useState, useEffect } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";


export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    const root = document.querySelector(":root");
    switch (theme) {
      case "dark":
        root.style.setProperty("--background-color-400", "#010102");
        root.style.setProperty("--background-color-300", "#0D0D14");
        root.style.setProperty("--background-color-200", "#282838");
        root.style.setProperty("--background-color-100", "#46465C");
        root.style.setProperty("--secondary-color-400", "#634629");
        root.style.setProperty("--secondary-color-300", "#E26723");
        root.style.setProperty("--secondary-color-200", "#EF9E21");
        root.style.setProperty("--secondary-color-100", "#F4D285");
        root.style.setProperty("--main-color-100", "#ffffff");
        root.style.setProperty("--main-color-200", "#808080");
        root.style.setProperty("--main-color-300", "#EF7500");
        root.style.setProperty("--main-color-400", "#000000");
        break;
      case "light":
        root.style.setProperty("--background-color-400", "#535a77");
        root.style.setProperty("--background-color-300", "#7980b1");
        root.style.setProperty("--background-color-200", "#a6ade2");
        root.style.setProperty("--background-color-100", "#e1e6fc");
        root.style.setProperty("--secondary-color-400", "#B18C5A");
        root.style.setProperty("--secondary-color-300", "#E26723");
        root.style.setProperty("--secondary-color-200", "#EF9E21");
        root.style.setProperty("--secondary-color-100", "#DF9B1C");
        root.style.setProperty("--main-color-100", "#000000");
        root.style.setProperty("--main-color-200", "#808080");
        root.style.setProperty("--main-color-300", "#EF7500");
        root.style.setProperty("--main-color-400", "#ffffff");
        break;
      default:
        break;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
