"use client"
import Image from 'next/image'
import { signIn } from "next-auth/react";
import { User, KeyRound, Eye, EyeOff, LoaderCircle, CircleAlert, CircleCheck } from 'lucide-react';
import * as React from "react"
import { useRouter } from 'next/navigation';
import { validate } from 'email-validator';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export default function HomePage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [issubmitting, setissubmitting] = React.useState<boolean>(false);
  const [loading, setloading] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false);
  const [resetemail, setResetemail] = React.useState<string>("")
  const [resetting, setresetting] = React.useState<boolean>(false)
  const [inputs, setinputs] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: ""
  });
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  }
  React.useEffect(() => {
    router.prefetch("/register")
    router.prefetch("/dashboard")
    return () => {

    }
  }, [router])
  const handlesubmit = async (): Promise<void> => {
    setissubmitting(true)
    if (!inputs.email || !inputs.password) {
      toast.error("All fields are required")
      setissubmitting(false)
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
      setissubmitting(false)
      return
    }
    try {

      const data = await fetch("/req/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs)
      })
      if (!data.ok) {
        const errormessage = await data.json()
        toast.custom((id: string | number) => (
          <div
            className="bg-red-700 text-white p-4 rounded-md shadow-lg flex items-center gap-3"
          >
            <CircleAlert size={20} />
            <p className="text-sm">{errormessage.detail}</p>
          </div>
        ))
        setissubmitting(false)
        return
      }
      const response = await data.json()
      localStorage.setItem("user", JSON.stringify(response.user_id))
      window.location.href="/dashboard"
    }
    catch (err) {
      toast.error("Something went wrong")
      setissubmitting(false)
    }
  }
  const handleReset = async (): Promise<void> => {
    setresetting(true)
    if (!validate(resetemail)) {
      toast.custom((id: string | number) => (
        <div
          className="bg-red-700 text-white p-4 rounded-md shadow-lg flex items-center gap-3"
        >
          <CircleAlert size={20} />
          <p className="text-sm">Please enter a valid email address.</p>
        </div>
      ))
      setresetting(false)
      return
    }
    const data = await fetch("/req/resetpass/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: resetemail })
    })
    if (!data.ok) {
      const errormessage = await data.json()
      toast.custom((id: string | number) => (
        <div
          className="bg-red-700 text-white p-4 rounded-md shadow-lg flex items-center gap-3"
        >
          <CircleAlert size={20} />
          <p className="text-sm">{errormessage.detail}</p>
        </div>
      ))
      setresetting(false)
      return
    }
    const response = await data.json()
    toast.custom((id: string | number) => (
      <div
        className="bg-green-700 text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-3"
      >
        <CircleCheck size={20} />
        <p className="text-sm">{response.message}</p>
      </div>
    ))
    setOpen(false)
    setResetemail("")
    setresetting(false)
  }

  return (
    <>
      <Toaster />
      <div className='w-full h-screen flex items-center justify-center'>
        <div className="w-[45%] h-full relative hidden lg:block">
          <Image
            src="/Main.jpeg"
            alt="logo"
            fill
            priority
            sizes="100%"
          />
        </div>

        <div className='lg:w-[55%] w-full h-full flex flex-col justify-center'>
          <div className='md:w-[65%] w-[90%] flex flex-col gap-5  mx-auto'>

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
              <h2 className='font-semibold text-xl'>Login to Aspire LMS</h2>
              <p className='text-[#989b9a]'>USER LOGIN</p>
            </div>
            {
              !loading ?
                <button onClick={() => { signIn("google", { callbackUrl: "/dashboard" }); setloading(true) }}
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
              <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 font-semibold '>or Sign in with</p>
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='font-semibold text-sm' htmlFor="email">Email</label>
              <div className='border border-[#dedede] flex items-center rounded-sm py-2 px-3 gap-2'>
                <User size={20} />
                <input  value={inputs.email} onChange={handlechange} autoFocus className='border-none outline-0 w-full' name='email' type="email" placeholder='Email' />
              </div>
            </div>
            <div className='flex flex-col gap-2 relative '>
              <label className='font-semibold text-sm' htmlFor="password">Password</label>
              <div className='border border-[#dedede] flex items-center rounded-sm py-2 px-3 gap-2'>
                <KeyRound size={20} />
                <input value={inputs.password} onChange={handlechange} className='border-none outline-0 w-[80%]' type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' />
                <p onClick={() => setOpen(true)} className='text-sm text-[#6941c5] absolute right-0 -bottom-6 cursor-pointer hover:underline font-semibold'>Forgot Password ?</p>
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
              !issubmitting ?
                <button onClick={handlesubmit} className='bg-[#6941c5] text-white py-2 w-full rounded-sm font-semibold mt-6 cursor-pointer transition-colors hover:bg-[#5a3bb3]'>Sign In</button> :
                <button disabled className='bg-[#6941c5] text-white py-2 w-full rounded-sm font-semibold cursor-pointer transition-colors hover:bg-[#5a3bb3] flex items-center justify-center gap-1.5 disabled:bg-gray-500 pointer-events-none my-4'>Sign In <LoaderCircle color='white' className='animate-spin' size={16} /></button>}

            <p onClick={() => router.replace('/register')} className='font-semibold text-sm text-center'>Do not have an account ? <span className='text-[#6941c5] cursor-pointer hover:underline font-semibold'>Create an account</span></p>
          </div>
        </div>

      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className='w-full text-center'>Reset Password</DialogTitle>
          <DialogDescription />
          <p className='text-gray-500 text-[16px]'>Enter your email address and we'll send you a link to reset your password</p>

          <div className="relative group my-6">
            <input
              required
              type="email"
              className="peer w-full border-b border-gray-600 bg-transparent px-2 pt-3 pb-1 text-base text-black focus:outline-none"
              autoFocus
              value={resetemail}
              onChange={(e) => setResetemail(e.target.value)}
              placeholder=" " // Needed for placeholder-shown logic
            />
            <label
              className="absolute left-2 transition-all
      peer-placeholder-shown:top-3
      peer-placeholder-shown:text-base
      peer-placeholder-shown:text-gray-500
      peer-focus:-top-5
      peer-focus:text-sm
      peer-focus:text-[#5a3bb3]
      peer-not-placeholder-shown:-top-5
      peer-not-placeholder-shown:text-sm
      peer-not-placeholder-shown:text-[#5a3bb3]"
            >
              Enter Your Email
            </label>

            <span className="bar"></span>
            <span className="highlight"></span>
          </div>


          {!resetting ? <button onClick={handleReset} className='bg-red-500  text-white py-2 w-full rounded-sm font-semibold mt-6 cursor-pointer transition-all scale-100 hover:scale-105 hover:bg-red-600'>Reset Password</button> :
            <button disabled className='bg-red-400  text-white py-2 w-full rounded-sm font-semibold mt-6 cursor-auto pointer-events-none  '>Reset Password</button>}
          <button onClick={() => setOpen(false)} className='absolute top-3 cursor-pointer right-3 bg-gray-300  p-1 rounded-2xl z-40 disabled:pointer-events-none '>
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
