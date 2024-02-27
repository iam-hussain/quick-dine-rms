import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("", {
  variants: {
    variant: {
      default: "",
      screen: "min-h-fill w-full h-full",
    },
    size: {
      sidebar: "w-[240px] h-full",
      sidebar_min: "w-[35px] h-full",
      default: "",
    },
    align: {
      default: "",
    },
    display: {
      default: "",
      flex_col: "flex justify-center flex-col align-middle items-center",
      flex_row: "flex justify-center align-middle items-center",
      flex_row_between: "flex justify-between align-middle items-center",
      grid: "",
      hidden: "hidden",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    align: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant, size, display, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(containerVariants({ variant, size, className, display }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };
