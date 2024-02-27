"use client";

import { Container } from "@/components/atoms/container";
import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import { useFullScreenHandle, FullScreen } from "react-full-screen";

export default function POS({ children }: { children: React.ReactNode }) {
  return (
    <Container variant={"screen"} className="pos-main-grid gap-0">
      {/* <TopMenu className="col-span-full row-span-1" /> */}
      <SideMenu className="md:row-start-2 md:row-end-13 md:col-span-1 absolute md:relative -left-full md:left-auto top-[56px] md:top-auto z-50" />
      <section className="pos__primary-section md:h-full h-auto w-ful">
        {children}
      </section>
    </Container>
  );
}
