"use client";
import { createContext, useContext, useState } from "react";

const Submit = createContext();

export function SubmitmodalProvider({ children }) {
  const [submitmodal, setsubmitmodal] = useState(false);

  return (
    <Submit.Provider value={{ submitmodal, setsubmitmodal }}>
      {children}
    </Submit.Provider>
  );
}

export function usesubmitmodal() {
  return useContext(Submit);
}
