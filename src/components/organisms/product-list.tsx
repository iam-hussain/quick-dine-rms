import React from "react";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import ProductCard from "@/components/molecules/product-card";
import { Container } from "@/components/atoms/container";
import clsx from "clsx";

const products = [
  {
    name: "Ghee Rava Dosa",
    deck: "Neque porro quisquam est velit...",
    image:
      "https://images.unsplash.com/photo-1612204104655-6c8a57ae235f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGZvb2RzfGVufDB8fDB8fHww",
  },
  {
    name: "Cheese Pizza",
    price: "50 ₹",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Peri Peri Chicken Burger",
    image:
      "https://images.unsplash.com/photo-1609167830220-7164aa360951?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mutton Briyani",
    image: "",
    active: true,
  },
  {
    name: "Idly",
    image: "",
  },
  {
    name: "Watermelon Juice",
    image: "",
  },
  {
    name: "Chocolate Moose",
    image: "",
  },
  {
    name: "Chicken Noodles",
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mushroom Pizza",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tandoori Burger",
    deck: "Neque porro quisquam est qui velit...",
    image:
      "https://images.unsplash.com/photo-1609167830220-7164aa360951?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ghee Rava Dosa",
    deck: "Neque porro quisquam est velit...",
    image:
      "https://images.unsplash.com/photo-1612204104655-6c8a57ae235f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGZvb2RzfGVufDB8fDB8fHww",
  },
  {
    name: "Cheese Pizza",
    price: "50 ₹",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Peri Peri Chicken Burger",
    image:
      "https://images.unsplash.com/photo-1609167830220-7164aa360951?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mutton Briyani",
    image: "",
    active: true,
  },
  {
    name: "Idly",
    image: "",
  },
  {
    name: "Watermelon Juice",
    image: "",
  },
  {
    name: "Chocolate Moose",
    image: "",
  },
  {
    name: "Chicken Noodles",
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mushroom Pizza",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tandoori Burger",
    deck: "Neque porro quisquam est qui velit...",
    image:
      "https://images.unsplash.com/photo-1609167830220-7164aa360951?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function ProductList({ className }: { className?: string }) {
  return (
    <ScrollArea
      className={clsx("w-full h-full bg-paper scroll-area__large", className)}
    >
      <Container className="grid md:grid-cols-5 grid-cols-2 gap-4 place-items-stretch place-content-around">
        {products.map((product, index) => (
          <div key={index} className="shrink-0">
            <ProductCard {...product} />
          </div>
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ProductList;
