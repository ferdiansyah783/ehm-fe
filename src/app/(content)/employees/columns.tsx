"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteEmployee, updateEmployee } from "../../../api/employee";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import SelectGender from "../../../components/select-gender";

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  address: string;
};

export const useEmployeeColumns = (): ColumnDef<Employee>[] => {
  const queryClient = useQueryClient();

  return [
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
        const [formData, setFormData] = useState({ ...employee });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const handleChangeGender = (gender: string) => {
          setFormData((prev) => ({ ...prev, gender }));
        };

        const updateMutation = useMutation({
          mutationFn: () => updateEmployee(employee.id, formData),
          onSuccess: () => {
            toast.success("Employee updated");
            queryClient.invalidateQueries({ queryKey: ["employees"] });
          },
          onError: () => {
            toast.error("Failed to update");
          },
        });

        const deleteMutation = useMutation({
          mutationFn: () => deleteEmployee(employee.id),
          onSuccess: () => {
            toast.success("Employee deleted");
            queryClient.invalidateQueries({ queryKey: ["employees"] });
          },
        });

        return (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Edit Employee</DialogTitle>
                  <DialogDescription>
                    Update employee information.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="gender">Gender</Label>
                    <SelectGender
                      value={formData.gender}
                      handleChangeGender={handleChangeGender}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={() => updateMutation.mutate()}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteMutation.mutate()}
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
};
