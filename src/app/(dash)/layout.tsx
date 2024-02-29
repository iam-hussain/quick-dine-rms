"use client";

import { Container } from "@/components/atoms/container";
import SideMenu from "@/components/organisms/side-menu";

export default function POS({ children }: { children: React.ReactNode }) {
  return (
    <Container variant={"screen"} className="flex relative">
      {/* <TopMenu className="col-span-full row-span-1" /> */}
      <SideMenu className="" />
      <section className="md:p-6 p-4 h-full w-full bg-paper">
        {children}
      </section>
    </Container>
  );
}
