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
      <Container className="flex w-full text-bg-foreground relative select-none pb-2">
        <div className="border-b-2 border-accent w-full absolute"></div>

        <CategoryCard
          name="All"
          active={!selectedCategory}
          onClick={() => onEachClick({})}
        />
        {categories.map((category, index) => (
          <CategoryCard
            key={`cat_${index}`}
            {...category}
            onClick={() => onEachClick(category)}
            active={selectedCategory === category.shortId}
          />
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
