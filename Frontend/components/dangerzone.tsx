import React from 'react'
import { TriangleAlert } from 'lucide-react'
import { useDelete } from '@/lib/DeleteModal'
import Card from './DeleteDialog'
const DangerZone = () => {
    const { Delete, setDelete } = useDelete()

    return (
        <>
            <h2 className='font-semibold text-lg mt-4 text-red-600 flex items-center'>
                <TriangleAlert strokeWidth={2.2} size={22} className='inline mr-0.5 text-red-600' />
                Danger Zone
            </h2>
            <div className='flex sm:items-center justify-between my-4 mx-2 flex-col sm:flex-row gap-8 sm:gap-0'>
                <div >
                    <p className='text-sm text-gray-600'>Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                <button onClick={() => { setDelete(true) }} className='bg-red-600 font-semibold text-sm text-white px-3 py-2 rounded-md cursor-pointer scale-100 hover:scale-105 transition-transform w-full sm:w-auto'>Delete Account</button>
            </div>
            <Card open={Delete} setOpen={setDelete} />
        </>
    )
}

export default DangerZone
