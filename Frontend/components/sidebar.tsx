"use client"
import { LibraryBig, LayoutGrid, User, Bolt, Bell, Power, MessageSquareText } from 'lucide-react'
import React, { useState } from 'react'
const Sidebar = () => {
    const [active, setActive] = useState<{
        dashboard: boolean;
        bookcatalog: boolean;
        myaccount: boolean;
        settings: boolean;
        notifications: boolean;
        helpandsupport: boolean;
    }>({
        dashboard: false,
        bookcatalog: true,
        myaccount: false,
        settings: false,
        notifications: false,
        helpandsupport: false,
    })

    return (
        <>
            <div className='flex  flex-col gap-4 w-full items-baseline'>

                <div data-active={active.dashboard} className={` flex text-black px-4 py-2.5 rounded-md items-center gap-2 cursor-pointer text-lg font-semibold w-full ${active.dashboard ? 'bg-[#6941c5] text-white' : ''}`}>
                    <div>
                        <LayoutGrid size={22} className={active.dashboard ? 'text-white' : 'text-[#4f6065]'} />
                    </div>
                    Dashboard
                </div>
                <div data-active={active.bookcatalog} className={` flex text-black font-semibold px-4 py-2.5 rounded-md items-center gap-2 cursor-pointer text-lg w-full ${active.bookcatalog ? 'bg-[#6941c5] text-white' : ''}`}>
                    <div>
                        <LibraryBig size={22} className={active.bookcatalog ? 'text-white' : 'text-[#4f6065]'} />
                    </div>
                    Book Catalog
                </div>
                <div className=' flex text-black font-semibold px-4 py-2.5 rounded-md items-center gap-2 cursor-pointer text-lg w-full '>
                    <div>
                        <User size={22} className='text-[#4f6065]' />
                    </div>
                    My Account
                </div>
                <div className=' flex text-black font-semibold px-4 py-2.5 rounded-md items-center gap-2 cursor-pointer text-lg w-full '>
                    <div>
                        <Bolt size={22} className='text-[#4f6065]' />
                    </div>
                    Settings
                </div>
                <div className=' flex text-black font-semibold px-4 py-2.5 rounded-md items-center gap-2  cursor-pointer text-lg w-full '>
                    <div>
                        <Bell size={22} className='text-[#4f6065]' />
                    </div>
                    Notifications
                </div>
                <div className=' flex text-black font-semibold px-4 py-2.5 rounded-md items-center gap-2  cursor-pointer text-lg w-full '>
                    <div>
                        <MessageSquareText size={22} className='text-[#4f6065]' />
                    </div>
                    Help and Support
                </div>
                <div className=' flex text-black font-semibold px-4 py-2.5 rounded-md items-center gap-2  cursor-pointer text-lg w-full '>
                    <div>
                        <Power size={22} className='text-[#4f6065]' />
                    </div>
                    Logout
                </div>
            </div>
        </>
    )
}

export default Sidebar