"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../../components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteAdmin } from "../../../api/admin";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthDate: string;
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
    accessorKey: "birthDate",
    header: "Birth Date",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const admin = row.original;

      const handleDeleteAdmin = useMutation({
        mutationFn: () => deleteAdmin(admin.id),
        onSuccess: () => toast.success("Admin deleted successfully"),
      });

      return (
        <div className="flex justify-items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => console.log("Edit", admin)}
          >
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteAdmin.mutate()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
