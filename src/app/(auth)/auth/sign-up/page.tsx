"use client";

import { signUp } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import SelectGender from "../../../../components/select-gender";

const page = () => {
  const initial = () => {
    return {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      gender: "",
      birthDate: "",
    };
  };

  const [formData, setFormData] = useState(initial());

  const router = useRouter();

  const mutateSignUp = useMutation({
    mutationKey: ["Auth-SignUp"],
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Signup success, please login");
      router.push("/auth/sign-in");
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

  const handleSignUp = () => {
    mutateSignUp.mutate(formData);
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link href="/auth/sign-in">
            <Button variant="link">Sign In</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fullname">First Name</Label>
              <Input
                id="firstname"
                name="firstName"
                type="text"
                placeholder="First Name..."
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                name="lastName"
                type="text"
                placeholder="Lastname..."
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email..."
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password..."
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <SelectGender
                value={formData.gender}
                handleChangeGender={(value: any) => {
                  setFormData((prev) => ({ ...prev, gender: value }));
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="birthdate">Birth Date</Label>
              <Input
                id="birthdate"
                name="birthDate"
                placeholder="YYYY-MM-DD"
                required
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleSignUp}>
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default page;
