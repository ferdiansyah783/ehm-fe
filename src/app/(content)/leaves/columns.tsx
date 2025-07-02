"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { deleteLeave, updateLeave } from "../../../api/leave";
import { Button } from "../../../components/ui/button";
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
import { Label } from "../../../components/ui/label";
import { Employee } from "../employees/columns";

export type Leave = {
  id: number;
  reason: string;
  startDate: string;
  endDate: string;
  employee: Employee;
};

export const useLeaveColumns = (): ColumnDef<Leave>[] => {
  const queryClient = useQueryClient();

  return [
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
        const [formData, setFormData] = useState({ ...leave });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const updateMutation = useMutation({
          mutationFn: () => updateLeave(leave.id, formData),
          onSuccess: () => {
            toast.success("Leave updated");
            queryClient.invalidateQueries({ queryKey: ["leaves"] });
          },
          onError: () => {
            toast.error("Failed to update");
          },
        });

        const deleteMutation = useMutation({
          mutationFn: () => deleteLeave(leave.id),
          onSuccess: () => {
            toast.success("Leave deleted");
            queryClient.invalidateQueries({ queryKey: ["leaves"] });
          },
        });

        return (
          <div className="flex gap-2">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button size="sm">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Edit Leave</DialogTitle>
                    <DialogDescription>
                      Edit leave information.
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
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      onClick={() => updateMutation.mutate()}
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
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
