import "../styles/globals.scss";

import type { Metadata } from "next";

import { Toaster } from "@/components/atoms/sonner";
import { QueryClientProvider } from "@/components/providers/query-client-provider";
import StoreProvider from "@/components/providers/store-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "Quick Dine Application",
  description: "Application for retail management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <StoreProvider>
          <QueryClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
