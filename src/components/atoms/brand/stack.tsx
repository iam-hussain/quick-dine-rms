import React from "react";
import clsx from "clsx";
import Icon from "@/components/atoms/icon";

type BrandSvgProps = {
  className?: string;
};

function BrandStack({ className }: BrandSvgProps) {
  return (
    <div
      className={clsx(
        "flex flex-col w-auto m-auto ml-0 gap-2 justify-center align-middle items-center select-none",
        className
      )}
    >
      <Icon
        name="FaBowlFood"
        className="text-primary md:text-9xl text-7xl font-thin"
      />
      <h1 className="md:text-7xl text-5xl font-display">QuickDine</h1>
    </div>
  );
}

export default BrandStack;
