"use client";
import * as React from "react";
import CategoryCard from "@/components/molecules/category-card";
import { Container } from "@/components/atoms/container";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import clsx from "clsx";

export function CategoriesSlide({
  className,
  categories,
}: {
  className?: string;
  categories: { name: string; shortId: string }[];
}) {
  return (
    <ScrollArea
      className={clsx(
        "w-auto min-w-full h-auto whitespace-nowrap rounded-md",
        className
      )}
    >
      <Container className="flex w-full space-x-2 pb-3 text-bg-foreground">
        <div className="shrink-0">
          <CategoryCard name="All" active={true} />
        </div>
        {[...categories, ...categories, ...categories].map(
          (category, index) => (
            <div key={`cat_${index}`} className="shrink-0">
              <CategoryCard {...category} />
            </div>
          )
        )}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
