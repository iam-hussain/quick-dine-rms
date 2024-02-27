import React from "react";
import clsx from "clsx";
import Icon from "@/components/atoms/icon";

type BrandSvgProps = {
  className?: string;
};

function BrandSideBySide({ className }: BrandSvgProps) {
  return (
    <div
      className={clsx(
        "flex flex-row w-auto m-auto ml-0 gap-2 justify-center align-middle items-center select-none text-2xl",
        className
      )}
    >
      <Icon name="FaBowlFood" className="text-primary font-thin text-3xl" />
      <h1 className="font-display">QuickDine</h1>
    </div>
  );
}

export default BrandSideBySide;
6;
