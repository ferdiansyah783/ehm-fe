import ReactQueryProvider from "@/components/react-query-provider";
import React from "react";
import AuthRoute from "../../components/auth-route";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <AuthRoute>
      <div className="h-screen w-screen flex justify-center items-center">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </div>
    </AuthRoute>
  );
};

export default Layout;
