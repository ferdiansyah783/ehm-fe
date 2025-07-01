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
import { columns } from "./columns";
import { DataTable } from "./data-table";

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

  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployees({ page: 1, take: 10 }),
  });

  const handleCreateEmployee = useMutation({
    mutationFn: () => createEmployee(formData),
    onSuccess: () => {
      console.log("success");
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

      <Dialog>
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
                  id="email"
                  name="email"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="gender">Gender</Label>
                <Input
                  onChange={handleChange}
                  value={formData.gender}
                  id="gender"
                  name="gender"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input
                  onChange={handleChange}
                  value={formData.phoneNumber}
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
