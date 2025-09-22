"use client"

import * as React from "react"
import { X } from "lucide-react"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function Modal({ open, onClose, children, title }: ModalProps) {
  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose} 
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="relative w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 ">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            <button
              className="p-1 rounded-full  bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-h-[80vh] overflow-y-auto p-4">{children}</div>
        </div>
      </div>
    </>
  )
}
