"use client"

import { ChartLineMultiple } from "@/components/lendingchart";
import { ChartPieDonut } from "@/components/pricingchart";
import { Toaster } from "@/components/ui/sonner";
import { BadgeAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react"
import { toast } from "sonner";
import { createSwapy } from 'swapy'
export default function DashboardPage() {
  const router = useRouter();
  const [chartData, setchartData] = React.useState({
    overdue: 0,
    returned: 0
  })
  const [other, setother] = React.useState({
    lended: "XX",
    overdue: "XX",
    reserved: "XX",
    isgetted: false
  })
  const [secondchartData, setsecondchartData] = React.useState([])
  const chartdatagetter = async (): Promise<void> => {
    const data = await fetch("/req/other/lendingactivity", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: JSON.parse(localStorage.getItem("user") || "")
      })
    })
    if (!data.ok) {
      toast.error("Unable to fetch data")
      return
    }
    const res = await data.json()
    setsecondchartData(res)
  }
  const chartdatagetter2 = async (): Promise<void> => {
    const data = await fetch("/req/other/borrowedoverview", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: JSON.parse(localStorage.getItem("user") || "")
      })
    })
    if (!data.ok) {
      toast.error("Unable to fetch data")
      return
    }
    const res = await data.json()
    setchartData(res)
  }
  const otherdata = async (): Promise<void> => {
    const data = await fetch("/req/other/data", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: JSON.parse(localStorage.getItem("user") || "")
      })
    })
    if (!data.ok) {
      toast.error("Unable to fetch data")
      return
    }
    const res = await data.json()
    setother({
      lended: res.lended,
      overdue: res.overdue,
      reserved: res.reserved,
      isgetted: true
    })
  }

  React.useEffect(() => {
    chartdatagetter()
    chartdatagetter2()
    otherdata()

    return () => {

    }
  }, [])
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
    <div className="flex items-center justify-between md:mx-5 my-3 ">
      <div className="font-semibold">
        Hello User
      </div>
      <div className="flex items-center text-sm bg-[#fff3df] border-2 border-[#d5cebf] p-1 rounded-sm gap-2">
        <div className="bg-[#e09a1c] p-1 rounded-sm ">
          <BadgeAlert size={15} color="white" />
        </div>
        <div className="text-[#bf9f4f] font-semibold text-xs sm:text-sm md:text-base">

          Library Operating Hours: Monday to Saturday: 9:00 AM to 7:00 PM, Sunday: Closed
        </div>
      </div>

    </div>
    <div className="flex items-start lg:items-center justify-between my-8 md:mx-5 flex-col lg:flex-row gap-3 ">
      <div className="bg-white w-full lg:w-fit flex items-center  lg:justify-center px-6 py-5 gap-4 rounded-lg">
        <div className={`bg-[#28cac9] px-3 py-2 rounded-md text-white ${other.isgetted ? "" : "animate-pulse"} `}>
          {other.lended}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">
            Lended Books
          </p>
          <p className="text-sm text-[#c2c6c9] font-semibold">Total Books currently borrowed.</p>
        </div>
      </div>
      <div className="bg-white w-full lg:w-fit flex items-center  lg:justify-center px-6 py-5 gap-4 rounded-lg">
        <div className={`bg-[#f44f7e] px-3 py-2 rounded-md text-white ${other.isgetted ? "" : "animate-pulse"}`}>
          {other.overdue}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">
            Books overdue for return.
          </p>
          <p className="text-sm text-[#c2c6c9] font-semibold">Total Books currently overdue.</p>
        </div>
      </div>
      <div className="bg-white w-full lg:w-fit flex items-center  lg:justify-center px-6 py-5 gap-4 rounded-lg">
        <div className={`bg-[#6740c7] px-3 py-2 rounded-md text-white  ${other.isgetted ? "" : "animate-pulse"} `}>
          {other.reserved}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">
            Reserved Books
          </p>
          <p className="text-sm text-[#c2c6c9] font-semibold">Books reserverd but not yet issued.</p>
        </div>
      </div>
    </div>

    <div className="flex items-center lg:items-start md:mx-5 gap-3 swapy lg:flex-row flex-col">
      <div data-swapy-slot="a" className="w-full lg:w-[30%] ">

        <ChartPieDonut overdue={chartData.overdue} returned={chartData.returned} />
      </div>
      <div data-swapy-slot="b" className="w-full lg:w-[70%]">
        <ChartLineMultiple data={secondchartData} />
      </div>
    </div>
  </>
}
