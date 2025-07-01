"use client";

import ReactQueryProvider from "@/components/react-query-provider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken !== null) {
      router.push("/");
    }
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </div>
  );
};

export default Layout;
