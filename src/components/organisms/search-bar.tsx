import clsx from "clsx";
import React, { useState } from "react";

import { Input } from "@/components/atoms/input";

function SearchBar({
  className,
  onChange,
}: {
  className?: string;
  onChange: (name: string) => void;
}) {
  const [value, setValue] = useState("");
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    onChange(value);
    setValue(value);
  };

  return (
    <Input
      type="text"
      placeholder="Search..."
      className={clsx("max-w-md w-full bg-background", className)}
      value={value}
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
