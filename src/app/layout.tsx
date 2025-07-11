import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../providers/auth-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
