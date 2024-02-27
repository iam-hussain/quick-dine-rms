import React from "react";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import clsx from "clsx";

function SearchBar({ className }: { className?: string }) {
  return (
    <div className={clsx("grid grid-cols-6 md:grid-cols-7 gap-2", className)}>
      <div className="relative col-span-5  md:col-span-6">
        <Input type="text" placeholder="Search..." className="bg-bw pr-8" />

        <Icon
          name="FiSearch"
          className="absolute -top-1 bottom-0 right-3 m-auto select-none text-primary"
        />
      </div>
      <ButtonToolTip
        label="Search Reset"
        icon="GrPowerReset"
        variant={"outline"}
      />
    </div>
  );
}

export default SearchBar;
