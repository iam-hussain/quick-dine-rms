import React from "react";
import clsx from "clsx";
import Icon from "@/components/atoms/icon";

type BrandSvgProps = {
  className?: string;
};

function BrandStackSlogan({ className }: BrandSvgProps) {
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
      <p className="text-secondary uppercase font-medium text-xs md:text-base">
        Order with Ease, Dine with Pleasure
      </p>
    </div>
  );
}

export default BrandStackSlogan;
