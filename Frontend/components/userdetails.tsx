"use client"
import React, { useState } from 'react'

const UserDetails = () => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        role: '',
        Membership: ''
    })
    return (
        <>
        <div className='my-4 flex items-center justify-between mx-2'>
            <div className='flex flex-col gap-1'>
                <div className='font-semibold text-sm flex items-start gap-1'>
                    Name
                </div>
                <div>
                    <input value={inputs.name} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' type="text" name='Email' disabled placeholder='Loading'  />
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='font-semibold text-sm flex items-start gap-1'>
                    Email
                </div>
                <div>
                    <input value={inputs.email} placeholder='Loading' className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' disabled type="text" name='Email'  />
                </div>
            </div>
        </div>
        <div className='my-4 flex items-center justify-between mx-2'>
            <div className='flex flex-col gap-1'>
                <div  className='font-semibold text-sm flex items-start gap-1'>
                    Role
                </div>
                <div>
                    <input value={inputs.role} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' type="text" name='Role' disabled placeholder='Loading'  />
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='font-semibold text-sm flex items-start gap-1'>
                    Membership Type
                </div>  
                <div>
                    <input value={inputs.Membership} placeholder='Loading' className='border border-gray-700 px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' disabled type="text" name='Membership'  />
                </div>
            </div>
        </div>
        </>
    )
}

export default UserDetails