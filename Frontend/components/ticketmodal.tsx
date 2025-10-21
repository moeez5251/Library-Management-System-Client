"use client";
import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
    useModal,
} from "./ui/animated-modal";
import { SendHorizontal } from "lucide-react";
import Modal_Content from "./modalcontent";
export function AnimatedModalDemo() {
    return (
        <div className="flex items-center mx-3">
            <Modal>
                <ModalTrigger className="bg-[#6941c5]  text-white flex justify-center group/modal-btn cursor-pointer">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                        Submit a ticket
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        <SendHorizontal size={20} />
                    </div>
                </ModalTrigger>
                <ModalBody>
                    <ModalContent>
                        <h1 className="font-semibold text-lg">Submit a ticket</h1>
                        <Modal_Content />

                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    );
}

function CloseButtonInsideModal() {
    const { setOpen } = useModal();
    return <span onClick={() => setOpen(false)}>Hello</span>;
}