"use client";
import * as React from "react";
import CategoryCard from "@/components/molecules/category-card";
import { Container } from "@/components/atoms/container";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import clsx from "clsx";

export function CategoriesSlide({
  className,
  categories,
  onClick,
  selected,
  totalItems,
}: {
  className?: string;
  categories: { name: string; id: string; productsConnected: number }[];
  onClick: (e: any) => void;
  selected: string;
  totalItems: number;
}) {
  return (
    <div className={clsx("flex w-auto h-auto gap-2 flex-col py-2", className)}>
      {/* <h1 className="text-xl font-medium">Categories</h1> */}
      <ScrollArea
        className={clsx(
          "w-auto min-w-full h-auto whitespace-nowrap transition-all duration-300"
        )}
      >
        <Container className="grid grid-flow-row auto-rows-max w-full text-bg-foreground px-4 py-2 gap-4">
          <CategoryCard
            name="All Menu"
            active={!selected}
            onClick={() => onClick({})}
            numberOfItems={totalItems}
          />
          {categories.map((category, index) => (
            <CategoryCard
              key={`cat_${index}`}
              {...category}
              onClick={() => onClick(category)}
              active={selected === category.id}
              numberOfItems={category.productsConnected}
            />
          ))}
        </Container>
        {/* <ScrollBar orientation="horizontal" /> */}
      </ScrollArea>
    </div>
  );
}
