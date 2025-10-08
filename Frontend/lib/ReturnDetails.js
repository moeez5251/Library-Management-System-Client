"use client";
import { createContext, useContext, useState } from "react";

const ReturnContext = createContext();

export function ReturnProvider({ children }) {
  const [ReturnBook, setReturnBook] = useState([]);

  return (
    <ReturnContext.Provider value={{ ReturnBook, setReturnBook }}>
      {children}
    </ReturnContext.Provider>
  );
}

export function useReturn() {
  return useContext(ReturnContext);
}
