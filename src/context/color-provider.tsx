import { createContext, useContext, useState } from "react";

interface ColorProps {
  color: string;
  toggleColor: (newColor: string) => void;
}

const ColorContext = createContext<ColorProps>({} as ColorProps);

const ColorProvider = ({ children }: { children: React.ReactNode }) => {
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
