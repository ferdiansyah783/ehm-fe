"use client";

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
import { useAuth } from "../../../../providers/auth-provider";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();

  const router = useRouter();

  const mutateSignIn = useMutation({
    mutationKey: ["Auth-SignIn"],
    mutationFn: async () => await login(email, password),
    onSuccess: (data) => {
      router.push("/");
    },
    onError: () => {
      alert("Failed to login please check again your email and password");
    },
  });

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link href="/auth/sign-up">
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
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
                required
                placeholder="Password..."
                value={password}
                onChange={handleChangePassword}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          onClick={() => mutateSignIn.mutate()}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default page;
