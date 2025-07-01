"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../lib/query-client";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default ReactQueryProvider;
