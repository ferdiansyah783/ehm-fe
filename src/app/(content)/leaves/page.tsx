"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { createLeave, getLeaves } from "../../../api/leave";
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
import { getEmployees } from "../../../api/employee";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";

export default function LeavePage() {
  const initalFormData = () => {
    return {
      reason: "",
      startDate: "",
      endDate: "",
      employee: "",
    };
  };

  const [formData, setFormData] = useState(initalFormData());

  const { data, isLoading } = useQuery({
    queryKey: ["leaves"],
    queryFn: () => getLeaves({ page: 1, take: 10 }),
  });

  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployees({ page: 1, take: 10 }),
  });

  const handleCreateLeave = useMutation({
    mutationFn: () => createLeave(Number(formData.employee), formData),
    onSuccess: () => toast.success("Leave approved"),
    onError: () => toast.error("Leave not approved"),
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
      <h1 className="text-2xl font-bold">Leave</h1>

      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add Leave</DialogTitle>
              <DialogDescription>
                Add a new leave to the system
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-3">
                <Label htmlFor="reason">Reason</Label>
                <Input
                  onChange={handleChange}
                  value={formData.reason}
                  id="reason"
                  name="reason"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  onChange={handleChange}
                  value={formData.startDate}
                  id="start-date"
                  name="startDate"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  onChange={handleChange}
                  value={formData.endDate}
                  id="end-date"
                  name="endDate"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="employee">Employee</Label>
                <Select
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, employee: value })
                  }
                  value={formData.employee}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Employee</SelectLabel>
                      {employees.data?.data.map((employee: any, index: any) => (
                        <SelectItem key={index} value={employee.id}>
                          {employee.firstName} {employee.lastName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={() => handleCreateLeave.mutate()}>
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
