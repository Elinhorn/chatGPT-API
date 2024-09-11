import { createContext, useContext, useState } from "react";

const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("bg-teal-400");

  const toggleColor = (newColor: string) => {
    setColor(newColor);
  };

  return (
    <ColorContext.Provider value={{ color, toggleColor }}>
      {children}
    </ColorContext.Provider>
  );
};

const useColor = () => {
  return useContext(ColorContext);
};

export { ColorProvider, useColor };
