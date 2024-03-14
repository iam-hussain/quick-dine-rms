"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/instance";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/atoms/skeleton";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";

function TagsBox({ className }: { className?: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => instance.get("/store/tags") as never as any,
  });
  const itemsPerPage = 10;
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
        {new Array(itemsPerPage).fill(1).map((e, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
        <div className="col-span-full flex justify-center align-middle items-start py-6">
          <Skeleton className="w-full md:w-1/4 h-10" />
        </div>
      </div>
    );
  }

  return (
    <Dialog>
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
            <DialogTrigger asChild key={i}>
              <Button
                variant={"accent"}
                className="flex flex-col bg-background text-foreground relative p-4 rounded-md px-12 h-auto"
              >
                <Badge
                  variant={"outline"}
                  className="select-none absolute top-2 right-2"
                >
                  {e.products.length || 0}
                </Badge>
                <p className="font-semibold">{e.name}</p>
                <p className="text-foreground/70 text-xs">{e.deck || ""}</p>
              </Button>
            </DialogTrigger>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">Heello</div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default TagsBox;
