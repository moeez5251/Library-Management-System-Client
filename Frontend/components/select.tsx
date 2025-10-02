"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
interface SelectComponentProps {
    array: (string | number)[]
    name: string
    value: string
    onchange: (value: string) => void
    disabled: boolean
}

const SelectComponent: React.FC<SelectComponentProps> = ({ array, name, value, onchange, disabled }) => {
    return (
        <div className='flex flex-col gap-2 font-semibold text-gray-600 text-sm'>
            {name}
            <Select disabled={disabled} value={value} onValueChange={onchange} >
                <SelectTrigger className="w-[150px] bg-white text-black  border-none    ">
                    <SelectValue className='text-black' placeholder={name} />
                </SelectTrigger>
                <SelectContent className='bg-white border-none'>
                    {array.map((item) => (
                        <SelectItem key={item.toString()} value={item.toString()}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

    )
}

export default SelectComponent