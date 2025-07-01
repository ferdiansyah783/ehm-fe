import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value: string;
  handleChangeGender: (value: string) => void;
};

const SelectGender = ({ value, handleChangeGender }: Props) => {
  return (
    <Select onValueChange={handleChangeGender} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Genders</SelectLabel>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectGender;
