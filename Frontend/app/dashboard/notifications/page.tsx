"use client"
import React, { useState, useEffect } from 'react'

import { MessageSquareWarning } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Image from 'next/image';
interface Notification {
  id: string;
  message: string;
  read: boolean;
  time: string;
  formatted: string;
}
const Notifications = () => {
  const [Notifications, setNotifications] = useState<Notification[]>([])
  useEffect(() => {
    (async () => {
      const data = await fetch("/req/notifications/get", {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-type": "application/json; charset=UTF-8",

        },
        body: JSON.stringify({ user_id: JSON.parse(localStorage.getItem("user") || "") })
      })
      if (!data.ok) {
        toast.error("Failed to fetch notifications");
        return;
      }
      const response = await data.json();
      if(response.length === 0){
        setNotifications([]);
        return;
      }
      setNotifications(response.map((item: any) => {
        const parsed = dayjs(item.CreatedAt, "DD-MM-YYYY, HH:mm:ss");

        return {
          id: item.Id,
          message: item.Message,
          read: item.IsRead,
          time: parsed.isValid() ? parsed.fromNow() : "Invalid date",
          formatted: parsed.isValid() ? parsed.format("DD/MM/YYYY, HH:mm:ss") : "Invalid date"
        };
      }));
      const read = await fetch("/req/notifications/markasread", {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-type": "application/json; charset=UTF-8",

        },
        body: JSON.stringify({ user_id: JSON.parse(localStorage.getItem("user") || "") })
      })

    })()

    return () => {

    }
  }, [])
  useEffect(() => {
    dayjs.extend(relativeTime);
    dayjs.extend(customParseFormat);
    return () => {

    }
  }, [Notifications])
  return (
    <>
      <Toaster />
      <h1 className='font-semibold text-xl sm:mx-4 my-2 '>Notifications</h1>
      <div className='bg-white sm:px-4 rounded-lg shadow-md sm:mx-4 pt-4 pb-8 h-full overflow-y-auto dark:bg-black'>
        <div className="flex flex-col gap-4 p-4">
          {
            Notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full ">
                <Image
                  src={"/notification.png"}
                  alt="No notifications"
                  width={400}
                  height={400}
                  priority
                  className='dark:invert'
                />
              </div>
            )
          }
          {Notifications.map((item, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-3 rounded-xl border ${item.read
                ? "bg-gray-50 border-gray-200"
                : "bg-white border-blue-200 ring-1 ring-blue-100"
                } shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800`}
            >
              <div className="flex items-center gap-3">
                {
                  <MessageSquareWarning className="w-5 h-5 text-blue-500 dark:text-blue-300" />
                }
                <div className='' >
                  <div
                    className={`${item.read ? "text-gray-600 font-normal" : "text-gray-900 font-semibold"
                      } dark:text-white`}
                  >
                    {item.message}
                  </div>
                  <div className="text-sm text-gray-400 dark:text-gray-400">{item.time}</div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Notifications