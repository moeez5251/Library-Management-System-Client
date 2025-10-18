"use client"
import { LibraryBig, LayoutGrid, User, Bolt, Bell, Power, MessageSquareText } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const Sidebar = () => {
    const pathname = usePathname()
    const [active, setActive] = useState<{
        dashboard: boolean;
        bookcatalog: boolean;
        myaccount: boolean;
        notifications: boolean;
        helpandsupport: boolean;
    }>({
        dashboard: true,
        bookcatalog: false,
        myaccount: false,
        notifications: false,
        helpandsupport: false,
    })
    const handletoggle = (e: string) => {
        setActive({
            dashboard: e === 'dashboard' ? true : false,
            bookcatalog: e === 'bookcatalog' ? true : false,
            myaccount: e === 'myaccount' ? true : false,
            notifications: e === 'notifications' ? true : false,
            helpandsupport: e === 'helpandsupport' ? true : false,
        })
    }
    useEffect(() => {
        setActive({
            dashboard: pathname === '/dashboard' ? true : false,
            bookcatalog: pathname === '/dashboard/catalog' ? true : false,
            myaccount: pathname === '/dashboard/myaccount' ? true : false,
            notifications: pathname === '/dashboard/notifications' ? true : false,
            helpandsupport: pathname === '/dashboard/helpandsupport' ? true : false,
        })

        return () => {

        }
    }, [])

    return (
        <>
            <div className='flex  flex-col gap-4 relative top-3 w-full items-baseline'>

                <Link href={'/dashboard'} prefetch={true} onClick={() => handletoggle('dashboard')} data-active={active.dashboard} className={` flex text-black px-4 py-2.5 rounded-md items-center gap-2 cursor-pointer text-lg font-semibold w-full transition-colors duration-100 ${active.dashboard ? 'bg-[#6941c5] text-white' : ''}`}>
                    <div>
                        <LayoutGrid size={22} className={active.dashboard ? 'text-white' : 'text-[#4f6065]'} />
                    </div>
                    Dashboard
                </Link>
                <Link href={'/dashboard/catalog'} prefetch={true} onClick={() => handletoggle('bookcatalog')} data-active={active.bookcatalog} className={` flex text-black font-semibold px-4 py-2.5 rounded-md items-center gap-2 cursor-pointer text-lg w-full transition-colors duration-100 ${active.bookcatalog ? 'bg-[#6941c5] text-white' : ''}`}>
                    <div>
                        <LibraryBig size={22} className={active.bookcatalog ? 'text-white' : 'text-[#4f6065]'} />
                    </div>
                    Book Catalog
                </Link>
                <Link href={'/dashboard/myaccount'} prefetch={true} onClick={() => handletoggle('myaccount')} data-active={active.myaccount} className={` flex text-black font-semibold px-4 py-2.5 rounded-md items-center gap-2 cursor-pointer text-lg w-full transition-colors duration-100 ${active.myaccount ? 'bg-[#6941c5] text-white' : ''}`}>
                    <div>
                        <User size={22} className={active.myaccount ? 'text-white' : 'text-[#4f6065]'} />
                    </div>
                    My Account
                </Link>
            
                <Link href={'/dashboard/helpandsupport'} prefetch={true} onClick={() => handletoggle('helpandsupport')} data-active={active.helpandsupport} className={`flex text-black font-semibold px-4 py-2.5 rounded-md items-center gap-2  cursor-pointer text-lg w-full transition-colors duration-100 ${active.helpandsupport ? 'bg-[#6941c5] text-white' : ''} `}>
                    <div>
                        <MessageSquareText size={22} className={active.helpandsupport ? 'text-white' : 'text-[#4f6065]'} />
                    </div>
                    Help and Support
                </Link>
                <Link href={'/dashboard/notifications'} prefetch={true} onClick={() => handletoggle('notifications')} data-active={active.notifications} className={` flex text-black font-semibold px-4 py-2.5 rounded-md items-center gap-2  cursor-pointer text-lg w-full transition-colors duration-100 ${active.notifications ? 'bg-[#6941c5] text-white' : ''} `}>
                    <div>
                        <Bell size={22} className={active.notifications ? 'text-white' : 'text-[#4f6065]'} />
                    </div>
                    Notifications
                </Link>
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