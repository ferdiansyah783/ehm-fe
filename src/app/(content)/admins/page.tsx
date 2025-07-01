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
import { getAdmins } from "../../../api/admin";

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
    queryKey: ["admins"],
    queryFn: () => getAdmins({ page: 1, take: 10 }),
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
      <h1 className="text-2xl font-bold">Admin</h1>

      <DataTable columns={columns} data={data?.data} />
    </div>
  );
}
