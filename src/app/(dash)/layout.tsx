"use client";

import { Container } from "@/components/atoms/container";
import SideMenu from "@/components/organisms/side-menu";
import instance from "@/lib/instance";
import { useStoreStore } from "@/stores/storeSlice";
import { useQuery } from "@tanstack/react-query";

export default function POS({ children }: { children: React.ReactNode }) {
  const setStoreData = useStoreStore((state) => state.setStoreData);
  // useQuery({
  //   queryKey: ["store"],
  //   queryFn: () => instance.get("/store").then((data) => setStoreData(data)),
  // });

  // if (isLoading) return <div>Loading...</div>;

  // if (error) return <div>Error: {error.message}</div>;

  // if (data) {
  //   setStoreData(data);
  // }

  return (
    <Container variant={"screen"} className="flex relative">
      {/* <TopMenu className="col-span-full row-span-1" /> */}
      <SideMenu />
      <section className="md:p-6 p-4 h-full w-full bg-paper">
        {children}
      </section>
    </Container>
  );
}
