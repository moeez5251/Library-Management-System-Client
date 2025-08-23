"use client"

import { ChartLineMultiple } from "@/components/lendingchart";
import { ChartPieDonut } from "@/components/pricingchart";
import { Toaster } from "@/components/ui/sonner";
import { BadgeAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react"
import { toast } from "sonner";
import { createSwapy } from 'swapy'
export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [Trigger, settrigger] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (session && !Trigger) {
      (async () => {
        const data = await fetch("http://127.0.0.1:8000/users/auth-users", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user?.email,
            google_id: session.user?.googleId,
            name: session.user?.name

          })
        })
        if (!data.ok) {
          toast.error("Failed to authenticate user")
          router.push("/")
          return
        }
        const response = await data.json()
        localStorage.setItem("user", JSON.stringify(response.userID))
        settrigger(true)
      })()
    }

    return () => {

    }
  }, [session])
  React.useEffect(() => {
    router.prefetch("/");
    return () => {

    }

  }, [router])
  React.useEffect(() => {

    const container = document.querySelector('.swapy') as HTMLElement
    if (container) {

      const swapy = createSwapy(container, {
        animation: 'spring',
        swapMode: "hover"
      })
    }
    return () => {

    }
  }, [])
  return <>
    <Toaster />
    <div className="flex items-center justify-between mx-5 my-3">
      <div className="font-semibold">
        Hello User
      </div>
      <div className="flex items-center text-sm bg-[#fff3df] border-2 border-[#d5cebf] p-1 rounded-sm gap-2">
        <div className="bg-[#e09a1c] p-1 rounded-sm">
          <BadgeAlert size={15} color="white" />
        </div>
        <div className="text-[#bf9f4f] font-semibold">

          Library Operating Hours: Monday to Saturday: 9:00 AM to 7:00 PM, Sunday: Closed
        </div>
      </div>

    </div>
    <div className="flex items-center justify-between my-10 mx-5">
      <div className="bg-white w-fit flex items-center justify-center px-6 py-5 gap-4 rounded-lg">
        <div className="bg-[#28cac9] px-3 py-2 rounded-md text-white animate-pulse ">
          XX
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">
            Lended Books
          </p>
          <p className="text-sm text-[#c2c6c9] font-semibold">Total Books currently borrowed.</p>
        </div>
      </div>
      <div className="bg-white w-fit flex items-center justify-center px-6 py-5 gap-4 rounded-lg">
        <div className="bg-[#f44f7e] px-3 py-2 rounded-md text-white animate-pulse">
          XX
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">
            Books overdue for return.
          </p>
          <p className="text-sm text-[#c2c6c9] font-semibold">Total Books currently overdue.</p>
        </div>
      </div>
      <div className="bg-white w-fit flex items-center justify-center px-6 py-5 gap-4 rounded-lg">
        <div className="bg-[#6740c7] px-3 py-2 rounded-md text-white animate-pulse">
          XX
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">
            Reserved Books
          </p>
          <p className="text-sm text-[#c2c6c9] font-semibold">Books reserverd but not yet issued.</p>
        </div>
      </div>
    </div>

    <div className="flex items-start mx-5 gap-3 swapy">
      <div data-swapy-slot="a" className="w-[30%] ">

        <ChartPieDonut />
      </div>
      <div data-swapy-slot="b" className="w-[70%]">
        <ChartLineMultiple />
      </div>
    </div>
  </>
}
