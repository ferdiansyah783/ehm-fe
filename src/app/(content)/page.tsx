"use client";

import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateAdmin } from "../../api/admin";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../providers/auth-provider";
import { toast } from "sonner";
import SelectGender from "../../components/select-gender";

export default function DashboardPage() {
  const initial = () => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      birthDate: "",
    };
  };

  const [formData, setFormData] = useState(initial());

  const { user, logout } = useAuth();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateAdmin = useMutation({
    mutationFn: () => updateAdmin(user!.id, formData),
    onSuccess: () => toast.success("Profile updated successfully"),
  });

  const handleChangeGender = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  useEffect(() => {
    setFormData({
      firstName: user!.firstName,
      lastName: user!.lastName,
      email: user!.email,
      gender: user!.gender,
      birthDate: user!.birthDate,
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome back {user?.firstName} {user?.lastName}
      </h1>

      <div className="flex gap-2">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button>Edit Profile</Button>
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
                  <SelectGender value={formData.gender} handleChangeGender={handleChangeGender} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="birth-date">BirtDate</Label>
                  <Input
                    onChange={handleChange}
                    value={formData.birthDate}
                    id="birth-date"
                    name="birthDate"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={() => handleUpdateAdmin.mutate()}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>

        <Button variant="destructive" onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
