"use client"
import { User, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, transformValue } from "motion/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const UserDetails = () => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        Membership: ''
    })
    const [Passwords, setPasswords] = useState({
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
    })
    const [passwordvibility, setPasswordvibility] = useState({
        OldPassword: false,
        NewPassword: false,
        ConfirmPassword: false
    })
    const [opening, setopening] = useState(false)
    const [isverifying, setisverifying] = useState(false);
    const [selectedTab, setSelectedTab] = useState("otp");
    const [dialogpass, setdialogpass] = useState(true)
    const [dialoginputs, setDialoginputs] = useState({
        NewPassword: '',
        ReNew: ''
    })
    const [dialogicons, setDialogicons] = useState({
        newPasswordVisible: false,
        reNewPasswordVisible: false
    })
    const [otpvalue, setotpvalue] = useState("")
    const handlepasswordchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPasswords({ ...Passwords, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        (async () => {
            try {
                const data = await fetch("http://127.0.0.1:8000/users/getbyid", {
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
                console.log(res);
                setInputs({
                    name: res[0]?.User_Name,
                    email: res[0]?.Email,
                    Membership: res[0]?.Membership_Type
                })
            }
            catch {
                toast.error("Unable to fetch user details")
            }
        })()

        return () => {

        }
    }, [])
    const handledialoginputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDialoginputs({
            ...dialoginputs,
            [e.target.name]: e.target.value
        })
    }
    const handleforget = async (): Promise<void> => {
        setopening(true)
        try {

            const api = await fetch("http://127.0.0.1:8000/mail/send-mail", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: inputs.name,
                    to: inputs.email
                })
            })
            if (!api.ok) {
                toast.error("Unable to send mail")
            }
            toast.success("Mail sent successfully")
        }
        catch {
            toast.error("Unable to send mail")
        }
    }
    const handleverify = async (a: string): Promise<void> => {
        setisverifying(true)
        try {
            const api = await fetch("http://127.0.0.1:8000/otp/verify", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: inputs.email,
                    otp: a
                })
            })
            if (!api.ok) {
                toast.error("Invalid OTP")
                setisverifying(false)
                return
            }
            setSelectedTab("change")
            setisverifying(false)
        }
        catch {
            toast.error("Unable to verify")
        }
    }

    const handlechangepass = async (): Promise<void> => {

    }
    useEffect(() => {
        if (dialoginputs.NewPassword !== dialoginputs.ReNew || dialoginputs.NewPassword.trim() === "") {
            setdialogpass(true)
        }
        else {
            setdialogpass(false)
        }
        return () => {

        }
    }, [dialoginputs])

    return (
        <>
            <Toaster />
            <h2 className='font-semibold text-lg mt-4 text-gray-700'>
                <User strokeWidth={2.2} size={22} className='inline mr-0.5 text-[#6941c5]' />
                User Details
            </h2>
            <div className='my-4 flex items-center justify-between mx-2 '>
                <div className='flex flex-col gap-1'>
                    <div className='font-semibold text-sm flex items-start gap-1'>
                        Name
                    </div>
                    <div>
                        <input value={inputs.name} className='text-sm w-full' type="text" name='Email' disabled placeholder='Loading' />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='font-semibold text-sm flex items-start gap-1 '>
                        Email
                    </div>
                    <div>
                        <input value={inputs.email} placeholder='Loading' className='text-sm w-[200px]' disabled type="text" name='Email' />
                    </div>
                </div>
            </div>
            <div className='my-4 flex items-center justify-between mx-2'>

                <div className='flex flex-col gap-1'>
                    <div className='font-semibold text-sm flex items-start gap-1'>
                        Membership Type
                    </div>
                    <div>
                        <input value={inputs.Membership} placeholder='Loading' className='text-sm w-full' disabled type="text" name='Membership' />
                    </div>
                </div>
            </div>
            <div className='flex mt-6 items-baseline justify-between'>

                <h2 className='font-semibold text-lg  text-gray-700 '>
                    <ShieldCheck size={22} className='inline mr-0.5 text-[#6941c5]' />
                    Privacy and Security
                </h2>
                <div onClick={handleforget} className='text-[#6941c5] text-sm cursor-pointer font-semibold hover:underline'>
                    Forget Password ?
                </div>
            </div>
            <div className='my-4 flex items-center justify-between  mx-2'>
                <div className='flex flex-col gap-1 relative'>
                    <div className='font-semibold text-sm flex items-start gap-1'>
                        Old Password
                    </div>
                    <div className='flex items-center gap-1'>
                        <input onChange={handlepasswordchange} value={Passwords.OldPassword} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' type={passwordvibility.OldPassword ? "text" : "password"} name='OldPassword' placeholder='Enter your old password' />
                        {
                            passwordvibility.OldPassword ?
                                <EyeOff onClick={() => {
                                    setPasswordvibility({
                                        ...passwordvibility,
                                        OldPassword: false
                                    })
                                }} size={25} className='cursor-pointer' />
                                :
                                <Eye onClick={() => {
                                    setPasswordvibility({
                                        ...passwordvibility,
                                        OldPassword: true
                                    })
                                }} size={25} className='cursor-pointer' />
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='font-semibold text-sm flex items-start gap-1'>
                        New Password

                    </div>
                    <div className='flex items-center gap-1'>
                        <input onChange={handlepasswordchange} value={Passwords.NewPassword} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' type={passwordvibility.NewPassword ? "text" : "password"} name='NewPassword' placeholder='Enter your new password' />
                        {
                            passwordvibility.NewPassword ?
                                <EyeOff onClick={() => {
                                    setPasswordvibility({
                                        ...passwordvibility,
                                        NewPassword: false
                                    })
                                }} size={25} className='cursor-pointer' />
                                :
                                <Eye onClick={() => {
                                    setPasswordvibility({
                                        ...passwordvibility,
                                        NewPassword: true
                                    })
                                }} size={25} className='cursor-pointer' />
                        }

                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='font-semibold text-sm flex items-start gap-1'>
                        Re Enter New Password

                    </div>
                    <div className='flex items-center gap-1'>
                        <input onChange={handlepasswordchange} value={Passwords.ConfirmPassword} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' type={passwordvibility.ConfirmPassword ? "text" : "password"} name='ConfirmPassword' placeholder='Enter your new password' />
                        {
                            passwordvibility.ConfirmPassword ?
                                <EyeOff onClick={() => {
                                    setPasswordvibility({
                                        ...passwordvibility,
                                        ConfirmPassword: false
                                    })
                                }} size={25} className='cursor-pointer' />
                                :
                                <Eye onClick={() => {
                                    setPasswordvibility({
                                        ...passwordvibility,
                                        ConfirmPassword: true
                                    })
                                }} size={25} className='cursor-pointer' />
                        }
                    </div>

                </div>
            </div>
            <Dialog open={opening} onOpenChange={setopening} >
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle className="text-center">{selectedTab === 'otp' ? "Enter OTP for Verification" : "Enter New Password"}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription></DialogDescription>
                    <button onClick={() => { setopening(false); setSelectedTab('otp');setisverifying(false);  }} className='absolute top-3 cursor-pointer right-3 bg-gray-300  p-1 rounded-2xl z-40 '>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            className="injected-svg"
                            color="black"
                            data-src="https://cdn.hugeicons.com/icons/multiplication-sign-solid-rounded.svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="black"
                                fillRule="evenodd"
                                d="M5.116 5.116a1.25 1.25 0 0 1 1.768 0L12 10.232l5.116-5.116a1.25 1.25 0 0 1 1.768 1.768L13.768 12l5.116 5.116a1.25 1.25 0 0 1-1.768 1.768L12 13.768l-5.116 5.116a1.25 1.25 0 0 1-1.768-1.768L10.232 12 5.116 6.884a1.25 1.25 0 0 1 0-1.768Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                        <AnimatePresence mode="wait">
                            {selectedTab === "otp" && (
                                <motion.div
                                    key="tab1"
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className='flex flex-col items-center justify-center gap-4'>

                                        <div className='text-center'>Email sent to <span className='text-[#6841c4]'>{inputs.email.slice(0, 3) + "***@***.com"}</span></div>
                                        <div className='mx-auto'>

                                            <InputOTP maxLength={6} value={otpvalue} onChange={async (value) => {
                                                setotpvalue(value)
                                                if (value.length === 6) {
                                                    handleverify(value);
                                                }
                                            }}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot autoFocus={true} className="text-xl text-[#6841c4] dark:text-white" index={0} />
                                                    <InputOTPSlot className="text-xl text-[#6841c4] dark:text-white" index={1} />
                                                    <InputOTPSlot className="text-xl text-[#6841c4] dark:text-white" index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot className="text-xl text-[#6841c4] dark:text-white" index={3} />
                                                    <InputOTPSlot className="text-xl text-[#6841c4] dark:text-white" index={4} />
                                                    <InputOTPSlot className="text-xl text-[#6841c4] dark:text-white" index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                            {
                                                !isverifying &&
                                                <Button onClick={() => handleverify(otpvalue)} disabled={otpvalue.length !== 6} className="w-[95%] btn-verify bg-[#6841c4] text-base h-10 mt-8 rounded-full cursor-pointer hover:bg-[#5917f3]">Verify</Button>
                                            }
                                            {
                                                isverifying &&
                                                <Button disabled className="w-[95%]  bg-[#6841c4] text-base h-10 mt-8 rounded-full cursor-pointer hover:bg-[#5917f3]">Verifying</Button>
                                            }

                                        </div>

                                        <DialogFooter className="text-center block my-3 ">Didn&apos;t receive code? <span onClick={handleforget} className='text-[#6841c4] cursor-pointer'>Click to resend.</span></DialogFooter>

                                    </div>
                                </motion.div>
                            )}
                            {selectedTab === "change" && (
                                <motion.div
                                    key="tab2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className='flex flex-col items-center justify-center gap-4'>
                                        <div className='flex flex-col gap-2 items-start justify-start  w-[95%] mx-auto'>

                                            <div className='font-semibold text-sm flex items-start gap-1 '>
                                                Enter  New Password
                                            </div>
                                            <div className='relative w-full'>
                                                <input value={dialoginputs.NewPassword} onChange={handledialoginputs} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' type={dialogicons.newPasswordVisible ? "text" : "password"} name="NewPassword" id="NewPassword" placeholder='Enter New Password' />
                                                {
                                                    !dialogicons.newPasswordVisible &&
                                                    <Eye onClick={() => { setDialogicons({ ...dialogicons, newPasswordVisible: true }) }} className='absolute -right-6 top-2 cursor-pointer' size={18} />
                                                }
                                                {
                                                    dialogicons.newPasswordVisible &&
                                                    <EyeOff onClick={() => { setDialogicons({ ...dialogicons, newPasswordVisible: false }) }} className='absolute -right-6 top-2 cursor-pointer' size={18} />
                                                }
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 items-start justify-start  w-[95%] mx-auto'>

                                            <div className='font-semibold text-sm flex items-start gap-1 '>
                                                Re-Enter  New Password
                                            </div>
                                            <div className='relative w-full'>
                                                <input value={dialoginputs.ReNew} onChange={handledialoginputs} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' type={dialogicons.reNewPasswordVisible ? "text" : "password"} name="ReNew" id="ReNew" placeholder='Enter New Password' />
                                                {
                                                    !dialogicons.reNewPasswordVisible &&
                                                    <Eye onClick={() => { setDialogicons({ ...dialogicons, reNewPasswordVisible: true }) }} className='absolute -right-6 top-2 cursor-pointer' size={18} />
                                                }
                                                {
                                                    dialogicons.reNewPasswordVisible &&
                                                    <EyeOff onClick={() => { setDialogicons({ ...dialogicons, reNewPasswordVisible: false }) }} className='absolute -right-6 top-2 cursor-pointer' size={18} />
                                                }
                                            </div>
                                        </div>
                                        {
                                            !isverifying &&
                                            <div className='mx-auto'>
                                                <Button onClick={handlechangepass} disabled={dialogpass} className=" btn-verify bg-[#6841c4] text-base h-10 mt-8 rounded-full cursor-pointer hover:bg-[#5917f3] dark:text-white">Change Password</Button>

                                            </div>
                                        }
                                        {
                                            isverifying &&
                                            <div className='mx-auto'>
                                                <Button disabled={true} className=" btn-verify bg-[#6841c4] text-base h-10 mt-8 rounded-full cursor-pointer hover:bg-[#5917f3]">Change Password</Button>

                                            </div>
                                        }



                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Tabs>


                </DialogContent>

            </Dialog>


        </>
    )
}

export default UserDetails