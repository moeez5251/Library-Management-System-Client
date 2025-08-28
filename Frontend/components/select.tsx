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
}

const SelectComponent: React.FC<SelectComponentProps> = ({ array, name }) => {
    return (
        <Select>
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
    )
}

export default SelectComponent