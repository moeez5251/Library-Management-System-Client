"use client";
import { createContext, useContext, useState } from "react";

const Notification = createContext();

export function NotificationsProvider({ children }) {
  const [Notifications, setNotifications] = useState([]);

  return (
    <Notification.Provider value={{ Notifications, setNotifications }}>
      {children}
    </Notification.Provider>
  );
}

export function useNotifications() {
  return useContext(Notification);
}
