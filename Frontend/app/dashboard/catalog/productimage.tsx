"use client";
import { useState, useEffect } from "react";
import { BookOpenText } from "lucide-react";

const bookColors = [
    "bg-book-1",
    "bg-book-2",
    "bg-book-3",
    "bg-book-4",
    "bg-book-5",
    "bg-book-6",
    "bg-book-7",
    "bg-book-8",
    "bg-book-9",
];

export const ProductImageCell = () => {
    const [color, setColor] = useState<string>("bg-book-1");
    console.log(color);
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * bookColors.length);
        setColor(bookColors[randomIndex]);
    }, []);

    return (
        <div className={`${color} h-50 rounded-sm flex items-center justify-center`}>
            <BookOpenText className={` ${color == "bg-book-6" || color == "bg-book-1" || color == "bg-book-9" ? "text-black":"text-white"}`} size={120} />
        </div>
    );
};
