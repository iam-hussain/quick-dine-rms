import clsx from "clsx";
import React from "react";

import { Input } from "@/components/atoms/input";

function SearchBar({ className }: { className?: string }) {
  return (
    <Input
      type="text"
      placeholder="Search..."
      className={clsx("max-w-md w-full bg-background", className)}
    />
  );
}

export default SearchBar;
