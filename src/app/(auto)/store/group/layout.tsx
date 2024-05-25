"use client";

import CategoriesProvider from "@/components/templates/categories-provider";

export default function POS({ children }: { children: React.ReactNode }) {
  return <CategoriesProvider>{children}</CategoriesProvider>;
}
