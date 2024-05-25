"use client";
import { Suspense } from "react";

import Loader from "@/components/molecules/loader";
import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import BasePage from "@/components/templates/base-page";

export default function POS({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-screen-wrapper">
      <SideMenu />
      <main className={"page-main bg-background"}>
        <TopMenu className="block z-30 fixed bg-background w-full" />
        <Suspense fallback={<Loader minFullScreen={true} />}>
          <BasePage>{children}</BasePage>
        </Suspense>
      </main>
    </div>
  );
}
