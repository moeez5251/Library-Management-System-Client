"use client"
import Image from 'next/image'
import { signIn } from "next-auth/react";
import { User, KeyRound, Eye, EyeOff, LoaderCircle, CircleAlert } from 'lucide-react';
import * as React from "react"
import { useRouter } from 'next/navigation';
import { validate } from 'email-validator';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

export default function HomePage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [issubmitting, setissubmitting] = React.useState<boolean>(false)
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
  }

  return (
    <>
      <Toaster />
      <div className='w-full h-screen flex items-center justify-center'>
        <div className="w-[45%] h-full relative">
          <Image
            src="/Main.jpeg"
            alt="logo"
            fill
            priority
            sizes="100%"
          />
        </div>

        <div className='w-[55%]  h-full flex flex-col justify-center'>
          <div className='w-[65%] flex flex-col gap-5  mx-auto'>

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
            <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
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
            </button>
            <div className='relative my-2'>
              <div className='border-b-1 w-full'></div>
              <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 font-semibold '>or Sign in with</p>
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='font-semibold text-sm' htmlFor="email">Email</label>
              <div className='border border-[#dedede] flex items-center rounded-sm py-2 px-3 gap-2'>
                <User size={20} />
                <input value={inputs.email} onChange={handlechange} autoFocus className='border-none outline-0 w-full' name='email' type="email" placeholder='Email' />
              </div>
            </div>
            <div className='flex flex-col gap-2 relative '>
              <label className='font-semibold text-sm' htmlFor="password">Password</label>
              <div className='border border-[#dedede] flex items-center rounded-sm py-2 px-3 gap-2'>
                <KeyRound size={20} />
                <input value={inputs.password} onChange={handlechange} className='border-none outline-0 w-[80%]' type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' />
                <p className='text-sm text-[#6941c5] absolute right-0 -bottom-6 cursor-pointer hover:underline font-semibold'>Forgot Password ?</p>
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
                <button disabled className='bg-[#6941c5] text-white py-2 w-full rounded-sm font-semibold cursor-pointer transition-colors hover:bg-[#5a3bb3] flex items-center justify-center gap-1.5 disabled:bg-gray-500 pointer-events-none'>Sign In <LoaderCircle color='white' className='animate-spin' size={16} /></button>}

            <p onClick={() => router.replace('/register')} className='font-semibold text-sm text-center'>Do not have an account ? <span className='text-[#6941c5] cursor-pointer hover:underline font-semibold'>Create an account</span></p>
          </div>
        </div>

      </div>
    </>
  )
}
