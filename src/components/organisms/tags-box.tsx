"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/instance";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/atoms/skeleton";
import { Badge } from "@/components/atoms/badge";

function TagsBox({ className }: { className?: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => instance.get("/store/tags") as never as any,
  });

  if (isLoading || !data) {
    return (
      <div className={cn("w-full grid grid-cols-6 gap-6", className || "")}>
        {new Array(10).fill(1).map((e, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 gap-6",
        className || ""
      )}
    >
      {data &&
        data.map(
          (
            e: {
              products: [any];
              name: string;
              deck?: string;
            },
            i: React.Key | null | undefined
          ) => (
            <div
              className=" bg-background text-foreground relative p-4 rounded-md"
              key={i}
            >
              <Badge
                variant={"outline"}
                className="select-none absolute top-2 right-2"
              >
                Connected: {e.products.length || 0}
              </Badge>
              <p className="pt-3 font-semibold">{e.name}</p>
              <div className="text-foreground/70 text-xs">{e.deck || ""}</div>
            </div>
          )
        )}
    </div>
  );
}

export default TagsBox;
