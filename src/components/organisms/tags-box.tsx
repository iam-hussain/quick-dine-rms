"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/instance";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/atoms/skeleton";
import { Badge } from "@/components/atoms/badge";
import { Button } from "../atoms/button";

function TagsBox({ className }: { className?: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => instance.get("/store/tags") as never as any,
  });
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const hasLoadMore = useMemo(() => {
    if (data && data.length) {
      return itemsPerPage * currentPage < data.length;
    }
    return false;
  }, [currentPage, data]);

  const items = useMemo(() => {
    if (data && data.length && currentPage) {
      return data.slice(0, itemsPerPage * currentPage);
    } else {
      return [];
    }
  }, [currentPage, data]);

  const baseClass =
    "w-full grid md:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 lg:gap-6";

  if (isLoading || !data) {
    return (
      <div className={cn(baseClass, className || "")}>
        {new Array(12).fill(1).map((e, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
        <div className="col-span-full flex justify-center align-middle items-start py-6">
          <Skeleton className="w-full md:w-1/4 h-10" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(baseClass, className || "")}>
      {items.map(
        (
          e: {
            products: [any];
            name: string;
            deck?: string;
          },
          i: React.Key | null | undefined
        ) => (
          <div
            className=" bg-background text-foreground relative p-4 rounded-md pr-12"
            key={i}
          >
            <Badge
              variant={"outline"}
              className="select-none absolute top-2 right-2"
            >
              {e.products.length || 0}
            </Badge>
            <p className="font-semibold">{e.name}</p>
            <div className="text-foreground/70 text-xs">{e.deck || ""}</div>
          </div>
        )
      )}
      <div className="col-span-full flex justify-center align-middle items-start py-6">
        <Button
          variant={"outline"}
          className="w-full md:w-1/4 select-none"
          disabled={!hasLoadMore}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Load more...
        </Button>
      </div>
    </div>
  );
}

export default TagsBox;
