"use client"
import { Bell, MessageSquareMore, UserRound, Power, Menu } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNotifications } from '@/lib/notifications';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from 'next/navigation';
import { logout } from "@/lib/logout";
import { useSession } from "next-auth/react";

interface Notification {
    id: string;
    message: string;
    read: boolean;
    time: string;
    formatted: string;
}
const Navbar = () => {
    const { Notifications } = useNotifications();
    const router = useRouter();
    const { status } = useSession();
    useEffect(() => {
        router.prefetch("/dashboard/helpandsupport")
        router.prefetch("/dashboard/myaccount")


        return () => {

        }
    }, [router])
    const handlesidebar = (): void => {
       document.querySelector(".sidebar")?.classList.add("left-0")
    }
    return (
        <>
            <div className='my-4 flex items-center justify-between mx-2 sm:mx-10'>
                    <Menu onClick={handlesidebar} size={30} className='text-[#6841c4] block xl:hidden' />
                    <div className="sm:flex hidden items-center  text-[#6841c4] md:text-xl font-extrabold gap-2 border border-[#e3e7ea] w-fit px-2 py-1 text-sm ">
                        <div>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                className="injected-svg"
                                color="#6841c4"
                                data-src="https://cdn.hugeicons.com/icons/book-edit-stroke-standard.svg"
                            >
                                <path
                                    stroke="#6841c4"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 19v2h2l5-5-2-2-5 5Z"
                                />
                                <path
                                    stroke="#6841c4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M12 5.5V20s-3.5-3.686-10-2.106v-14.5C8.5 1.814 12 5.5 12 5.5Zm0 0s3.5-3.686 10-2.106V11.5"
                                />
                            </svg>
                        </div>

                        ASPIRE LMS
                    </div>

                <div className='flex items-center gap-3'>

                    <Popover>
                        <PopoverTrigger> <div className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110 relative dark:bg-[#293750]'>
                            <Bell size={19} color='#9499a1' />
                            <div className='absolute -top-1 -right-0.5  bg-red-600 text-white text-xs px-1 rounded-full'>{Notifications.length}</div>
                            {
                                Notifications.length > 0 &&
                                <span
                                    className="absolute -top-1 -right-0.5 h-4 w-4 animate-ping rounded-full bg-red-400 opacity-75"
                                ></span>
                            }
                        </div></PopoverTrigger>
                        <PopoverContent className='border-none'>
                            {Notifications.length > 0 && Notifications.map((item: Notification, index: number) => (
                                <div
                                    key={index}
                                    className={`flex items-center sm:px-4 px-2 sm:py-3 py-1 rounded-xl border ${item.read
                                        ? "bg-gray-50 border-gray-200"
                                        : "bg-white border-blue-200 ring-1 ring-blue-100 "
                                        } shadow-sm hover:shadow-md transition-shadow duration-200  dark:bg-[#232d3b] dark:border-[#2a3547]`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div
                                                className={`${item.read
                                                    ? "text-gray-600 font-normal"
                                                    : "text-gray-900 font-semibold"
                                                    } dark:text-white`}
                                            >
                                                {item.message}
                                            </div>
                                            <div className="text-sm text-gray-400">{item.time}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {
                                Notifications.length === 0 && (
                                    <div className="flex items-center px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-[#232d3b] dark:border-[#2a3547]">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="text-gray-600 font-semibold dark:text-white">
                                                    You have no notifications
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </PopoverContent>

                    </Popover>

                    <div onClick={() => router.push("/dashboard/helpandsupport")} className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110 relative dark:bg-[#293750]'>
                        <MessageSquareMore size={19} color='#9499a1' />

                    </div>
                    <div onClick={() => router.push("/dashboard/myaccount")} className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110 relative dark:bg-[#293750]'>
                        <UserRound size={19} color='#9499a1' />

                    </div>
                    <div onClick={() => logout(status)} className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110 relative dark:bg-[#293750]'>
                        <Power size={19} color='#9499a1' />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar