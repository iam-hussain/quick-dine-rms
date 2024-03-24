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
        "w-auto min-w-full h-auto whitespace-nowrap rounded-md",
        className
      )}
    >
      <Container className="flex w-full space-x-2 pb-3 text-bg-foreground">
        <div className="shrink-0">
          <CategoryCard
            name="All"
            active={!selectedCategory}
            onClick={() => onEachClick({})}
          />
        </div>
        {categories.map((category, index) => (
          <div key={`cat_${index}`} className="shrink-0">
            <CategoryCard
              {...category}
              onClick={() => onEachClick(category)}
              active={selectedCategory === category.shortId}
            />
          </div>
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
