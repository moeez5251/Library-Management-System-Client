"use client";
import { createContext, useContext, useState } from "react";

const LendingContext = createContext();

export function LendingFetcherProvider({ children }) {
  const [Lendingmodel, setLendingmodel] = useState(false);

  return (
    <LendingContext.Provider value={{ Lendingmodel, setLendingmodel }}>
      {children}
    </LendingContext.Provider>
  );
}

export function useLendingFetcher() {
  return useContext(LendingContext);
}
