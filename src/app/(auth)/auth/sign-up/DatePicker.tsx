"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  isOpen: boolean;
  date: Date | undefined;
  handleChangeDate: (date: Date | undefined) => void;
  handleOpen: (open: boolean) => void;
};

const DatePicker = ({ isOpen, date, handleChangeDate, handleOpen }: Props) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor="date" className="px-1">
        Date of birth
      </Label>
      <Popover open={isOpen} onOpenChange={handleOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => handleChangeDate(date)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
