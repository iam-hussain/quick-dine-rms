"use client";
import * as React from "react";
import CategoryCard from "@/components/molecules/category-card";
import { Container } from "@/components/atoms/container";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import clsx from "clsx";

const categoryList = [
  {
    name: "All",
    image:
      "https://images.unsplash.com/photo-1612204104655-6c8a57ae235f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGZvb2RzfGVufDB8fDB8fHww",
  },
  {
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1609167830220-7164aa360951?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Briyani",
    image: "",
    active: true,
  },
  {
    name: "Indian Breads",
    image: "",
  },
  {
    name: "Juice",
    image: "",
  },
  {
    name: "Desert",
    image: "",
  },
  {
    name: "Noodles",
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "All Menu",
    image:
      "https://images.unsplash.com/photo-1612204104655-6c8a57ae235f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGZvb2RzfGVufDB8fDB8fHww",
  },
  {
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1609167830220-7164aa360951?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Briyani",
    image: "",
  },
  {
    name: "Indian Breads",
    image: "",
  },
  {
    name: "Juice",
    image: "",
  },
  {
    name: "Desert",
    image: "",
  },
  {
    name: "Noodles",
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function CategoriesSlide({ className }: { className?: string }) {
  return (
    <ScrollArea
      className={clsx("w-auto h-auto whitespace-nowrap rounded-md", className)}
    >
      <Container className="flex w-max space-x-2 px-2 py-3 bg-bw text-bg-foreground">
        {categoryList.map((product, index) => (
          <div key={index} className="shrink-0">
            <CategoryCard {...product} />
          </div>
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
