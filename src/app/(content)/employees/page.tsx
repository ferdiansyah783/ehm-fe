"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { createEmployee, getEmployees } from "../../../api/employee";
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
import { Input } from "../../../components/ui/input";
import { DataTable } from "./data-table";
import { toast } from "sonner";
import SelectGender from "../../../components/select-gender";
import { useEmployeeColumns } from "./columns";

export default function EmployeePage() {
  const initalFormData = () => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      phoneNumber: "",
      address: "",
    };
  };

  const [formData, setFormData] = useState(initalFormData());
  const [openDialog, setOpenDialog] = useState(false);
  const [updated, setUpdated] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["employees", !updated],
    queryFn: () => getEmployees({ page: 1, take: 10 }),
  });

  const columns = useEmployeeColumns();

  const handleCreateEmployee = useMutation({
    mutationFn: () => createEmployee(formData),
    onSuccess: () => {
      toast.success("Employee created successfully");
      setFormData(initalFormData());
      setOpenDialog(false);
      setUpdated((prev) => !prev);
    },
    onError: (error: any) => {
      const message = Array.isArray(error.response.data?.message)
        ? error.response.data?.message[0]
        : error.response.data?.message;
      toast.error(message);
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Employee</h1>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <form>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
              <DialogDescription>
                Add a new employee to the system
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-3">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  onChange={handleChange}
                  value={formData.firstName}
                  id="first-name"
                  name="firstName"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  onChange={handleChange}
                  value={formData.lastName}
                  id="last-name"
                  name="lastName"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="q4NlF@gmail.com"
                  id="email"
                  name="email"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="gender">Gender</Label>
                <SelectGender
                  value={formData.gender}
                  handleChangeGender={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value }))
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  placeholder="+6287894573986"
                  id="phone-number"
                  name="phoneNumber"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="address">Address</Label>
                <Input
                  onChange={handleChange}
                  value={formData.address}
                  id="address"
                  name="address"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={() => handleCreateEmployee.mutate()}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <DataTable columns={columns} data={data?.data} />
    </div>
  );
}
