"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  address: string;
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <div className="flex justify-items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => console.log("Edit", employee)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => console.log("Delete", employee)}
          >
            Delete
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
