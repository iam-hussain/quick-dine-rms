"use client";

import * as React from "react";
import {
  QueryClientProvider as QClient,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: any) {
  return <QClient client={queryClient}>{children}</QClient>;
}
