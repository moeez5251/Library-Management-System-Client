"use client"
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useDelete } from '@/lib/DeleteModal'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Card: React.FC<Props> = ({ open, setOpen }) => {
    const router = useRouter()
    const { Delete, setDelete } = useDelete()
    const [Disabledelete, setDisabledelete] = useState(false)
    const handledelete = async (): Promise<void> => {
        setDisabledelete(true)
        try {

            const user = JSON.parse(localStorage.getItem("user") || "")
            const data = await fetch("/req/users/delete", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user
                })
            })
            if (!data.ok) {
                toast.error("Unable to delete account")
                setDisabledelete(false)
                return
            }
            setDelete(false)
            setDisabledelete(false)
            toast.success("Account deleted successfully")
            localStorage.removeItem("user")
            router.replace("/")
            
        }
        catch {
            toast.error("Unable to delete account")
            setDisabledelete(false)
        }
    }
        return (
            <Dialog open={Delete} onOpenChange={setDelete}>
                <DialogContent onInteractOutside={(e) => e.preventDefault()} className="w-full lg:w-1/3 rounded-3xl shadow-lg " >
                    <DialogTitle></DialogTitle>
                    <DialogDescription className="flex flex-col items-center justify-center gap-2 my-4">
                        <span className=" bg-white rounded-lg  overflow-hidden text-left flex flex-col gap-4 dark:bg-[#1b2536]">
                            <span className="p-1 bg-white dark:bg-[#1b2536]">
                                <span className="flex justify-center items-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                                    <svg
                                        aria-hidden="true"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="w-6 h-6 text-red-600"
                                    >
                                        <path
                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </span>
                                <span className="mt-3 text-center flex flex-col gap-4">
                                    <span className="text-gray-900 text-base font-semibold leading-6 dark:text-white">Delete Account</span>
                                    <span className="my-2  text-gray-500 leading-5 flex flex-col text-base gap-1 dark:text-gray-200">
                                        <span>
                                            Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.
                                        </span>
                                        <span>
                                            Once you delete your account, there is no going back. Please be certain.
                                        </span>
                                    </span>
                                </span>
                                {
                                    !Disabledelete &&
                                    <button
                                        type="button"
                                        onClick={() => handledelete()}
                                        className="w-full inline-flex justify-center py-2 my-3 text-white bg-red-600 text-base font-medium rounded-md shadow-sm border border-transparent cursor-pointer transition-all scale-95 hover:scale-100"
                                    >
                                        Delete
                                    </button>
                                }
                                {
                                    Disabledelete &&
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center py-2 my-3 text-white bg-red-600 text-base font-medium rounded-md shadow-sm border border-transparent cursor-auto pointer-events-none transition-all  disabled:bg-red-700"
                                        disabled={true}
                                    >
                                        Deleting...
                                    </button>}
                                <button
                                    type="button"
                                    onClick={() => setDelete(false)}
                                    className="w-full inline-flex justify-center  py-2 bg-white text-gray-700 text-base font-medium rounded-md shadow-sm border border-gray-300 cursor-pointer transition-all scale-95 hover:scale-100 dark:bg-[#16212f] dark:text-white dark:border-[#2b3649]"
                                >
                                    Cancel
                                </button>
                            </span>
                        </span>



                    </DialogDescription>
                    <button onClick={() => { setDelete(false) }} className='absolute top-3 cursor-pointer right-3 bg-gray-300  p-1 rounded-2xl z-40 '>
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
        );
    }

    export default Card;
