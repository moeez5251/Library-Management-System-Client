"use client"

import * as React from "react"
import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DisabledRange {
  before?: Date
  after?: Date
}

interface DatePickerProps {
  label: string
  date?: Date
  onChange: (date: Date | undefined) => void
  disabled?: boolean | DisabledRange
}

export function DatePicker({ label, date, onChange, disabled }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const calendarDisabled = React.useCallback(
    (currentDate: Date) => {
      if (typeof disabled === "boolean") return disabled
      if (!disabled) return false

      if (disabled.before && currentDate < disabled.before) return true
      if (disabled.after && currentDate > disabled.after) return true

      return false
    },
    [disabled]
  )

  return (
    <div className="flex flex-col gap-3  ">
      <Label htmlFor="date" className="px-1 font-semibold text-sm gap-1">
        {label}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="sm:w-48 w-full justify-between font-normal">
            {date ?  `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}` : "Select date"}
            <CalendarDays className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date ?? new Date()}
            onSelect={(selectedDate) => {
              onChange(selectedDate)
              setOpen(false)
            }}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear()}
            disabled={calendarDisabled} 
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
