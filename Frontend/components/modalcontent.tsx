"use client"
import React, { useState, useEffect } from 'react'
import {
    useModal
} from "./ui/animated-modal";
import { Asterisk } from 'lucide-react';
import { Toaster } from './ui/sonner';
import { validate } from 'email-validator';
import { toast } from 'sonner';
import { usesubmitmodal } from '@/lib/Submitmodal';

const Modal_Content = () => {
    const [inputs, setinputs] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [submitdisabled, setsubmitdisabled] = useState(true)
    const [emailvalidator, setemailvalidator] = useState(false)
    const { setOpen } = useModal();
    const { submitmodal, setsubmitmodal } = usesubmitmodal()
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setinputs({ ...inputs, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (inputs.name.trim() !== "" && inputs.email.trim() !== "" && inputs.message.trim() !== "") {
            setsubmitdisabled(false)
        }
        else {
            setsubmitdisabled(true)
        }
        return () => {

        }
    }, [inputs])
    const handlesubmit = async (): Promise<void> => {
        setsubmitdisabled(true)
        if (validate(inputs.email)) {
            setemailvalidator(false)
        }
        else {
            setemailvalidator(true)
            setsubmitdisabled(false)
            return
        }
        try {

            const data = await fetch("/req/mail/issue-mail", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: inputs.email,
                    subject: inputs.subject.trim().length > 0 ? inputs.subject : "Ticket Details",
                    issue: inputs.message,
                    name: inputs.name
                })
            })
            if (!data.ok) {
                toast.error("Unable to send mail")
                setsubmitdisabled(false)

                return
            }
            toast.success("Mail sent successfully")
            setsubmitdisabled(false)
            setOpen(false)
            setsubmitmodal(true)
        }
        catch (e) {
            toast.error("Unable to send mail")
            setsubmitdisabled(false)
        }
    }
    useEffect(() => {
        (async () => {
            try {
                const data = await fetch("/req/users/getbyid", {
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
                    toast.error("Unable to fetch user details")
                    return
                }
                const res = await data.json()
                setinputs({
                    ...inputs,
                    name: res[0]?.User_Name,
                    email: res[0]?.Email
                })

            }
            catch {
                toast.error("Unable to fetch user details")
            }
        })()

        return () => {

        }
    }, [])
    return (
        <>
            <Toaster />
            <div className='mt-4 flex flex-col gap-4 '>
                <div className='flex flex-col gap-1'>
                    <div className='font-semibold text-sm flex items-start '>
                        Name <Asterisk color='red' size={14} />
                    </div>
                    <div>
                        <input onChange={onChange} value={inputs.name} className='text-sm w-full border p-2 rounded-md border-gray-500 focus:outline-none' type="text" name='name' placeholder='Enter Your Name' />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='font-semibold text-sm flex items-start  '>
                        Email   <Asterisk color='red' size={14} />
                    </div>
                    <div>
                        <input onChange={onChange} value={inputs.email} placeholder='Enter Your Email' className={`text-sm w-full border p-2 rounded-md ${emailvalidator ? "border-red-500" : "border-gray-500"}  focus:outline-none`} type="email" name='email' />
                        {
                            emailvalidator && <p className='text-sm text-red-500'>Please enter a valid email address.</p>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='font-semibold text-sm flex items-start gap-1 '>
                        Subject
                    </div>
                    <div>
                        <input onChange={onChange} value={inputs.subject} placeholder='Write Your Subject' className='text-sm w-full border p-2 rounded-md border-gray-500 focus:outline-none' type="text" name='subject' />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='font-semibold text-sm flex items-start '>
                        Describe Your Issue <Asterisk color='red' size={14} />
                    </div>
                    <div>
                        <textarea onChange={onChange} value={inputs.message} rows={5} placeholder='Describe Your Issue' className='text-sm w-full border p-2 rounded-md border-gray-500 focus:outline-none resize-none' name='message' />
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 my-2'>
                <CloseButtonInsideModal />
                <button onClick={handlesubmit} disabled={submitdisabled} className='bg-[#6841c4] text-white w-1/2 px-3 py-2 rounded-md cursor-pointer scale-100 hover:scale-105 transition-transform disabled:bg-gray-400 disabled:pointer-events-none disabled:cursor-auto'>Submit</button>
            </div>
        </>
    )
}
export default Modal_Content

function CloseButtonInsideModal() {
    const { setOpen } = useModal();
    return <button className='bg-gray-500 text-white w-1/2 px-3 py-2 rounded-md cursor-pointer scale-100 hover:scale-105 transition-transform' onClick={() => setOpen(false)}>Cancel</button>;
}