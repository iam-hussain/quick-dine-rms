"use client";
import * as React from "react";
import CategoryCard from "@/components/molecules/category-card";
import { Container } from "@/components/atoms/container";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import clsx from "clsx";

export function CategoriesSlide({
  className,
  categories,
  onEachClick,
  selectedCategory,
}: {
  className?: string;
  categories: { name: string; shortId: string }[];
  onEachClick: (e: any) => void;
  selectedCategory: string;
}) {
  return (
    <ScrollArea
      className={clsx(
        "w-auto min-w-full h-auto whitespace-nowrap transition-all duration-300",
        className
      )}
    >
      <Container className="flex w-full text-bg-foreground">
        {/* <div className="shrink-2"> */}
        <CategoryCard
          name="All"
          active={!selectedCategory}
          onClick={() => onEachClick({})}
        />
        {/* </div> */}
        {categories.map((category, index) => (
          // <div key={`cat_${index}`} className="shrink-2">
          <CategoryCard
            key={`cat_${index}`}
            {...category}
            onClick={() => onEachClick(category)}
            active={selectedCategory === category.shortId}
          />
          // </div>
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
