"use client";

import { createContext, useState } from "react";

interface GlobalContextProps {
  children: React.ReactNode;
}

interface MyContextData {}

export const GlobalContext = createContext<MyContextData | undefined>(
  undefined
);

export const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {


  return 
    <GlobalContext.Provider value={{ }}>
      {children}
    </GlobalContext.Provider>
  );
};