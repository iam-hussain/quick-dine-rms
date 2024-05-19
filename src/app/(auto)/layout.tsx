"use client";
import Loader from "@/components/molecules/loader";
import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import BasePage from "@/components/templates/base-page";
import { Suspense } from "react";

export default function POS({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-wrapper">
      <SideMenu />
      <main className={"page-main bg-paper"}>
        <TopMenu className="block z-30 fixed bg-background w-full" />
        <Suspense fallback={<Loader minFullScreen={true} />}>
          <BasePage>{children}</BasePage>
        </Suspense>
      </main>
    </div>
  );
}
