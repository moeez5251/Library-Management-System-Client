"use client"
import Image from 'next/image'
import { signIn } from "next-auth/react";
import { User, KeyRound, Eye, EyeOff, LoaderCircle, CircleAlert, ShieldCheck } from 'lucide-react';
import * as React from "react"
import { useRouter } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { validate } from 'email-validator';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
export default function HomePage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [inputs, setInputs] = React.useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: ""
  });
  const [isubmitting, setisubmitting] = React.useState<boolean>(false)
  const [otp, setotp] = React.useState<boolean>(false)
  const [otpvalue, setotpvalue] = React.useState<string>("")
  const [otpinput, setotpinput] = React.useState<boolean>(false)
  const [otploading, setotploading] = React.useState<boolean>(false)
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  const handlesubmit = async (): Promise<void> => {
    setisubmitting(true)
    if (!inputs.name || !inputs.email || !inputs.password) {
      toast.error("All fields are required")
      setisubmitting(false)
      return
    }
    if (!validate(inputs.email)) {

      toast.custom((id: string | number) => (
        <div
          className="bg-red-700 text-white p-4 rounded-md shadow-lg flex items-center gap-3"
        >
          <CircleAlert size={20} />
          <p className="text-sm">Please enter a valid email address.</p>
        </div>
      ));
      setisubmitting(false)
      return
    }
    if (inputs.password.length < 8) {
      toast.custom((id: string | number) => (
        <div className="bg-red-700 text-white p-4 rounded-md shadow-lg flex items-center gap-3">
          <CircleAlert size={20} />
          <p className="text-sm">Password must be at least 8 characters long.</p>
        </div>
      ));

      setisubmitting(false)
      return
    }

    try {
      const existinguser = await fetch("/req/users/exist", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs.email
        })
      })
      const response = await existinguser.json()
      if (response.exist) {
        toast.custom((id: string | number) => (
          <div className="bg-red-700 text-white p-4 rounded-md shadow-lg flex items-center gap-3">
            <CircleAlert size={20} />
            <p className="text-sm">User with this email already exist</p>
          </div>
        ))
        setisubmitting(false)
        return
      }
      setotp(true)
      const data = await fetch("/req/mail/send-mail", {
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
      if (!data.ok) {
        toast.error("Failed to create account")
        setisubmitting(false)
        setotp(false)
      }

    }
    catch {
      toast.error("Server Error")
      setisubmitting(false)
      setotp(false)
    }

  }
  const handleverify = async (a: string): Promise<void> => {
    setotpinput(true)
    try {

      const verify = await fetch("/req/otp/verify", {
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
      if (!verify.ok) {
        const error = await verify.json()
        toast.error(error.detail)
        setotpinput(false)
        return
      }
      const r = await verify.json()
      const data = await fetch("/req/users/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs)
      })
      if (!data.ok) {
        const error = await data.json()
        toast.error(error.detail)
        setisubmitting(false)
        return
      }
      const response = await data.json()
      localStorage.setItem("user", JSON.stringify(response.user_id))

      setisubmitting(false)
      setotp(false)
      setInputs({
        name: "",
        email: "",
        password: ""
      })
      router.push("/dashboard")
    }
    catch {

    }
  }
  React.useEffect(() => {
    router.prefetch("/dashboard")
    router.prefetch("/")

    return () => {
    }
  }, [router])

  return (
    <>
      <Toaster />
      <div className='w-full h-screen flex items-center justify-center'>
        <div className="w-[45%] hidden lg:block h-full relative">
          <Image
            src="/Main.jpeg"
            alt="logo"
            fill
            priority
            sizes="100%"
          />
        </div>

        <div className='lg:w-[55%] w-full  h-full flex flex-col justify-center'>
          <div className='md:w-[65%] w-[90%] flex flex-col gap-3  mx-auto'>

            <div className="flex items-center  text-[#6841c4] text-xl font-bold gap-2 border border-[#e3e7ea] w-fit px-2 py-1 mx-auto ">
              <div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  className="injected-svg"
                  color="#6841c4"
                  data-src="https://cdn.hugeicons.com/icons/book-edit-stroke-standard.svg"
                >
                  <path
                    stroke="#6841c4"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19v2h2l5-5-2-2-5 5Z"
                  />
                  <path
                    stroke="#6841c4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 5.5V20s-3.5-3.686-10-2.106v-14.5C8.5 1.814 12 5.5 12 5.5Zm0 0s3.5-3.686 10-2.106V11.5"
                  />
                </svg>
              </div>

              ASPIRE LMS
            </div >
            <div className='flex flex-col items-start gap-2'>
              <h2 className='font-semibold text-xl'>Register in Aspire LMS</h2>
              <p className='text-[#989b9a]'>USER REGISTRATION</p>
            </div>
            {
              !otploading ?
                <button onClick={() => { setotploading(true); signIn("google", { callbackUrl: "/dashboard" }) }}
                  className="cursor-pointer text-black flex gap-2 items-center bg-white py-2 font-medium text-sm hover:bg-[#f7f7f7] transition-all ease-in duration-200 border border-[#f2f2f2] justify-center  my-1 rounded-sm  "
                >
                  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-6">
                    <path
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      fill="#FFC107"
                    ></path>
                    <path
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      fill="#FF3D00"
                    ></path>
                    <path
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      fill="#4CAF50"
                    ></path>
                    <path
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      fill="#1976D2"
                    ></path>
                  </svg>
                  Google
                </button> :
                <button disabled
                  className=" text-black flex gap-2 items-center bg-gray-100 cursor-auto pointer-events-none py-2 font-medium text-sm hover:bg-[#f7f7f7] transition-all ease-in duration-200 border border-[#f2f2f2] justify-center  my-1 rounded-sm  "
                >
                  <LoaderCircle color='gray' className='animate-spin' size={15} />
                </button>
            }
            <div className='relative my-2'>
              <div className='border-b-1 w-full'></div>
              <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 font-semibold '>or Sign up with</p>
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='font-semibold text-sm' htmlFor="email">Name</label>
              <div className='border border-[#dedede] flex items-center rounded-sm py-2 px-3 gap-2'>
                <User size={20} />
                <input  value={inputs.name} onChange={handlechange} autoFocus className='border-none outline-0 w-full' name='name' type="email" placeholder='Name' />
              </div>
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='font-semibold text-sm' htmlFor="email">Email</label>
              <div className='border border-[#dedede] flex items-center rounded-sm py-2 px-3 gap-2'>
                <User size={20} />
                <input  value={inputs.email} onChange={handlechange} className='border-none outline-0 w-full' name='email' type="email" placeholder='Email' />
              </div>
            </div>
            <div className='flex flex-col gap-2 relative '>
              <label className='font-semibold text-sm' htmlFor="password">Password</label>
              <div className='border border-[#dedede] flex items-center rounded-sm py-2 px-3 gap-2'>
                <KeyRound size={20} />
                <input value={inputs.password} onChange={handlechange} className='border-none outline-0 w-[80%]' type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' />

                <div className='absolute right-3'>
                  {
                    showPassword ?
                      <EyeOff onClick={() => setShowPassword(false)} className='cursor-pointer' size={20} />
                      :
                      <Eye onClick={() => setShowPassword(true)} className='cursor-pointer' size={20} />
                  }
                </div>
              </div>
            </div>
            {
              isubmitting ?
                <button disabled className='bg-[#6941c5] text-white py-2 w-full rounded-sm font-semibold cursor-pointer transition-colors hover:bg-[#5a3bb3] flex items-center justify-center gap-1.5 disabled:bg-gray-500 pointer-events-none'>Creating <LoaderCircle color='white' className='animate-spin' size={16} /></button> :
                <button onClick={handlesubmit} className='bg-[#6941c5] text-white py-2 w-full rounded-sm font-semibold cursor-pointer transition-colors hover:bg-[#5a3bb3]'>Sign Up</button>
            }
            <p onClick={() => router.replace('/')} className='font-semibold text-sm text-center'>Already have an account ? <span className='text-[#6941c5] cursor-pointer hover:underline font-semibold'>Sign In</span></p>
          </div>
        </div>

      </div>


      <Dialog open={otp} onOpenChange={setotp} >
        <DialogContent  onPointerDownOutside={(e) => e.preventDefault()} className="w-full lg:w-1/3 rounded-3xl shadow-lg " >
          <DialogTitle></DialogTitle>
          <DialogDescription />
          <div className="flex flex-col items-center  gap-2 my-0">

            <span className=" bg-white rounded-lg  overflow-hidden text-left flex flex-col gap-4 dark:bg-[#1b2536]">
              <span className="p-1 bg-white dark:bg-[#1b2536]">
                <span className="flex justify-center items-center w-12 h-12 mx-auto bg-green-100 rounded-full ">
                  <ShieldCheck color='green' size={20} />
                </span>
                <span className="mt-3 text-center flex flex-col gap-3">
                  <span className="text-gray-900 text-base font-semibold leading-6 dark:text-white">Verify Your Email Address</span>
                  <span className="my-2  text-[#6941c5]  leading-5 flex flex-col text-base  gap-1 dark:text-gray-200">
                    Email sent to {inputs.email.slice(0, 3) + " ***@***.com"}
                  </span>
                </span>
                <div className='my-5'>
                  <InputOTP maxLength={6} disabled={otpinput} value={otpvalue} onChange={async (value) => {
                    if (value.length === 6) {
                      handleverify(value);
                    }
                    setotpvalue(value);
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
                </div>

                <button
                  type="button"
                  onClick={() => { setotp(false); setisubmitting(false) }}
                  disabled={otpinput}
                  className="w-full inline-flex justify-center  py-2 bg-white text-gray-700 text-base font-medium rounded-md shadow-sm border border-gray-300 cursor-pointer transition-all scale-95 hover:scale-100 dark:bg-[#1b2536] dark:text-white dark:border-[#2b3649] disabled:pointer-events-none disabled:cursor-default disabled:opacity-70"
                >
                  Cancel
                </button>
              </span>
            </span>
          </div>

          <button disabled={otpinput} onClick={() => { setotp(false); setisubmitting(false) }} className='absolute top-3 cursor-pointer right-3 bg-gray-300  p-1 rounded-2xl z-40 disabled:pointer-events-none '>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              height={15}
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
        </DialogContent>
      </Dialog>
    </>
  )
}
