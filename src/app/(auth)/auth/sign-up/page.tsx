"use client";

import React, { ChangeEvent, useState } from "react";
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
import Link from "next/link";
import DatePicker from "./DatePicker";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import SelectGender from "../../../../components/select-gender";

const page = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const router = useRouter();

  const mutateSignUp = useMutation({
    mutationKey: ["Auth-SignUp"],
    mutationFn: signUp,
    onSuccess: () => {
      alert("Signup success, please login");
      router.push("/auth/sign-in");
    },
    onError: (error) => {
      alert(error.message[0]);
    },
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeGender = (value: string) => {
    setGender(value);
  };

  const handleChangeDate = (date: Date | undefined) => {
    setDate(date);
    setIsOpen(false);
  };

  const handleSignUp = () => {
    if (!date) {
      alert("please input field first");
    } else {
      mutateSignUp.mutate({
        firstName,
        lastName,
        email,
        password,
        gender,
        birthDate: format(date || "", "yyyy-MM-dd"),
      });
    }
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
                type="text"
                placeholder="First Name..."
                required
                value={firstName}
                onChange={handleChangeFirstName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                type="text"
                placeholder="Lastname..."
                required
                value={lastName}
                onChange={handleChangeLastName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email..."
                required
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password..."
                required
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <SelectGender
                value={gender}
                handleChangeGender={handleChangeGender}
              />
            </div>
            <div className="grid gap-2">
              <DatePicker
                isOpen={isOpen}
                date={date}
                handleChangeDate={handleChangeDate}
                handleOpen={handleOpen}
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
