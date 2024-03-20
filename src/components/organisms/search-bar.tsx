import React from "react";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import clsx from "clsx";

function SearchBar({ className }: { className?: string }) {
  return (
    <Input
      type="text"
      placeholder="Search..."
      className="max-w-md w-full bg-background"
    />
  );
}

export default SearchBar;
