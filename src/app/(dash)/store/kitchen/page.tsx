"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/atoms/resizable";
import Loader from "@/components/molecules/loader";
import OrderItem from "@/components/molecules/order-item";
import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";

export default function Kitchen() {
  const { data, isPending, isLoading } = useQuery({
    queryKey: ["orders-kot"],
    queryFn: () => fetcher("/store/orders/kot"),
  });

  if (isPending || isLoading) {
    return <Loader />;
  }

  const { items = {}, orders = [] } = data;
  const { placed = [], accepted = [], prepared = [] } = items;

  return (
    <div className="flex md:flex-row flex-col w-full h-full bg-background">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize={35}>
              <div className="flex h-full w-full gap-4 items-start justify-center p-6 border-4 overflow-auto">
                <div className="flex h-auto w-full gap-4 items-start justify-center flex-wrap grow">
                  {placed.map((item: any, index: number) => (
                    <OrderItem item={item} key={index} />
                  ))}
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={35}>
              <div className="flex h-full w-full flex-col items-center justify-center p-6 border-4">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
              <div className="flex h-full items-center justify-center p-6 bg-slate-200">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6 bg-slate-100">
            <span className="font-semibold">Three</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
