import * as React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SubmitDialog: React.FC<DialogProps> = ({
    open,
    onOpenChange,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl rounded-xl p-0 overflow-hidden">
                <div className="max-w-md mx-auto pt-12 pb-10 px-5 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full">
                        <svg
                            viewBox="0 0 48 48"
                            height={100}
                            width={100}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                y2="37.081"
                                y1="10.918"
                                x2="10.918"
                                x1="37.081"
                                id="SVGID_1__8tZkVc2cOjdg_gr1"
                            >
                                <stop stopColor="#60fea4" offset={0} />
                                <stop stopColor="#6afeaa" offset=".033" />
                                <stop stopColor="#97fec4" offset=".197" />
                                <stop stopColor="#bdffd9" offset=".362" />
                                <stop stopColor="#daffea" offset=".525" />
                                <stop stopColor="#eefff5" offset=".687" />
                                <stop stopColor="#fbfffd" offset=".846" />
                                <stop stopColor="#fff" offset={1} />
                            </linearGradient>
                            <circle
                                fill="url(#SVGID_1__8tZkVc2cOjdg_gr1)"
                                r="18.5"
                                cy={24}
                                cx={24}
                            />
                            <path
                                d="M35.401,38.773C32.248,41.21,28.293,42.66,24,42.66C13.695,42.66,5.34,34.305,5.34,24	c0-2.648,0.551-5.167,1.546-7.448"
                                strokeWidth={3}
                                strokeMiterlimit={10}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="#10e36c"
                                fill="none"
                            />
                            <path
                                d="M12.077,9.646C15.31,6.957,19.466,5.34,24,5.34c10.305,0,18.66,8.354,18.66,18.66	c0,2.309-0.419,4.52-1.186,6.561"
                                strokeWidth={3}
                                strokeMiterlimit={10}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="#10e36c"
                                fill="none"
                            />
                            <polyline
                                points="16.5,23.5 21.5,28.5 32,18"
                                strokeWidth={3}
                                strokeMiterlimit={10}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="#10e36c"
                                fill="none"
                            />
                        </svg>
                    </div>

                    <DialogHeader>
                        <DialogTitle className="text-xl  font-semibold mb-3">
                            Your ticket has been submitted
                        </DialogTitle>
                        <DialogDescription className="font-medium text-black text-center">
                            We will get back to you soon
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <DialogFooter className="pt-5 pb-6 px-6 text-right bg-gray-300-mb-2">

                    <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto bg-[#6941c5] hover:bg-[#6941d5] cursor-pointer ">
                        Close
                    </Button>
                </DialogFooter>
            <button onClick={() => { onOpenChange(false) }} className='absolute top-3 cursor-pointer right-3 bg-gray-300  p-1 rounded-2xl z-40 '>
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
};

export default SubmitDialog;
