"use client"
import { Bell,MessageSquareMore,Settings,UserRound,Power } from 'lucide-react'
import React from 'react'
const Navbar = () => {
    return (
        <>
            <div className='my-4 flex items-center justify-between mx-10'>
                <div className="flex items-center  text-[#6841c4] text-xl font-extrabold gap-2 border border-[#e3e7ea] w-fit px-2 py-1  ">
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
                    
                    <div className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110 relative dark:bg-[#293750]'>
                        <Bell size={19} color='#9499a1' />
                        <div className='absolute -top-1 -right-0.5  bg-red-600 text-white text-xs px-1 rounded-full'>1</div>
                        {/* Animation of dot */}
                        <span
                            className="absolute -top-1 -right-0.5 h-4 w-4 animate-ping rounded-full bg-red-400 opacity-75"
                        ></span>
                    </div>
                    <div className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110 relative dark:bg-[#293750]'>
                        <MessageSquareMore size={19} color='#9499a1' />
                       
                    </div>
                    <div className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110 relative dark:bg-[#293750]'>
                        <UserRound size={19} color='#9499a1' />
                       
                    </div>
                    <div className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110 relative dark:bg-[#293750]'>
                        <Power size={19} color='#9499a1' />
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar