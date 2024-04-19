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
}: {
  className?: string;
  categories: { name: string; id: string }[];
  onClick: (e: any) => void;
  selected: string;
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
          active={!selected}
          onClick={() => onClick({})}
        />
        {categories.map((category, index) => (
          <CategoryCard
            key={`cat_${index}`}
            {...category}
            onClick={() => onClick(category)}
            active={selected === category.id}
          />
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
