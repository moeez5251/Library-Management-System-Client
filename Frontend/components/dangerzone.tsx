import { TriangleAlert } from 'lucide-react'
import React from 'react'
const DangerZone = () => {
    return (
        <>
            <h2 className='font-semibold text-lg mt-4 text-red-600 flex items-center'>
                <TriangleAlert strokeWidth={2.2} size={22} className='inline mr-0.5 text-red-600' />
                Danger Zone
            </h2>
        </>
    )
}

export default DangerZone
