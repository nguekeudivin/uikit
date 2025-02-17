import { createContext, FC, ReactNode, useContext } from "react";

interface BluePrintContextType {
  data: any[];
}

interface BluePrintProvideProps {
  children: ReactNode;
}

const BluePrintContext = createContext<BluePrintContextType | undefined>(
  undefined
);

export const BluePrintProvider: FC<BluePrintProvideProps> = ({ children }) => {
  return (
    <BluePrintContext.Provider value={{ data: [] }}>
      {children}
    </BluePrintContext.Provider>
  );
};

export const useBluePrint = (): BluePrintContextType => {
  const context = useContext(BluePrintContext);
  if (!context) {
    throw new Error("useEmail must be used within a EmailProvider");
  }
  return context;
};
