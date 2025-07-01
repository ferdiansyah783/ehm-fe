"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { Employee } from "../employees/columns";
import { useMutation } from "@tanstack/react-query";
import { deleteLeave } from "../../../api/leave";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Leave = {
  id: number;
  reason: string;
  startDate: string;
  endDate: string;
  employee: Employee;
};

export const columns: ColumnDef<Leave>[] = [
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "employee",
    header: "Employee's Name",
    cell: ({ row }) => {
      const employee = row.original.employee;

      return (
        <div>
          {employee.firstName} {employee.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const leave = row.original;

      const handleDeleteLeave = useMutation({
        mutationFn: () => deleteLeave(leave.id),
        onSuccess: () => {
          console.log("success");
        },
      });

      return (
        <div className="flex justify-items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => console.log("Edit", leave)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDeleteLeave.mutate()}
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
