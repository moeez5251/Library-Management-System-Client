"use client";
import { createContext, useContext, useState } from "react";

const DataFetcherContext = createContext();

export function DataFetcherProvider({ children }) {
  const [datafetcher, setDatafetcher] = useState(false);

  return (
    <DataFetcherContext.Provider value={{ datafetcher, setDatafetcher }}>
      {children}
    </DataFetcherContext.Provider>
  );
}

export function useDataFetcher() {
  return useContext(DataFetcherContext);
}
