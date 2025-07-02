import { AppSidebar } from "../../components/app-sidebar";
import ProtectedRoute from "../../components/protected-route";
import ReactQueryProvider from "../../components/react-query-provider";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <SidebarTrigger />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
