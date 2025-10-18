"use client";
import { createContext, useContext, useState } from "react";

const DeleteMod = createContext();

export function DeleteModal({ children }) {
  const [Delete, setDelete] = useState(false);

  return (
    <DeleteMod.Provider value={{ Delete, setDelete }}>
      {children}
    </DeleteMod.Provider>
  );
}

export function useDelete() {
  return useContext(DeleteMod);
}
