import React, { useEffect, useState } from 'react'
import { ReserverdColumns } from './reservations/columns'
import ReservationsTable from './reservations/table'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'
interface Reserverd {
  Reservation_ID: number
  Book_ID: string
  Reserved_Date: string
  Book_Title: string
  Author: string
}

const MyReservation = () => {
  const [reservationdata, setreservationdata] = useState<Reserverd[]>([])
  const [isloading, setIsloading] = useState(true)
  useEffect(() => {
    (async () => {
      try {

        const data = await fetch("/req/reservation/getbyid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: JSON.parse(localStorage.getItem("user") || "")
          })
        })
        if (!data.ok) {
          toast.error("Unable to fetch reservations")
          setIsloading(false)
          return
        }
        const res = await data.json()
        setIsloading(false)
        setreservationdata(res.map((item: Reserverd) => {
          const date = new Date(item.Reserved_Date);
          return {
            Reservation_ID: item.Reservation_ID,
            Book_ID: item.Book_ID,
            Reserved_Date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            Book_Title: item.Book_Title,
            Author: item.Author
          }
        }))
      }
      catch {
        toast.error("Unable to fetch reservations")
        setIsloading(false)
      }
    })()

    return () => {

    }
  }, [])


  return (
    <>
      <Toaster />
      <div className='my-3 w-full overflow-x-auto'>
        {
          reservationdata.length > 0 || isloading ?
            <ReservationsTable data={reservationdata} columns={ReserverdColumns} loading={isloading} pageSize={5} />
            :
            <div className='text-center font-semibold text-lg text-gray-700 py-8'>No Active Reservation Found</div>
        }
      </div>
    </>
  )
}

export default MyReservation