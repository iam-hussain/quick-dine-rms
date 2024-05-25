"use client";

import ProductsProvider from "@/components/templates/products-provider";

export default function POS({ children }: { children: React.ReactNode }) {
  return <ProductsProvider>{children}</ProductsProvider>;
}
