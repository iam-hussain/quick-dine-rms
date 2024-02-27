import React from "react";
import { Button } from "@/components/atoms/button";
import Icon, { IconKey } from "@/components/atoms/icon";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";

function MenuItem({
  icon,
  label,
  minimize,
  active,
}: {
  icon: IconKey;
  label: string;
  minimize: Boolean;
  active: Boolean;
}) {
  if (minimize) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              className={clsx("flex justify-end gap-2 font-normal", {
                "text-primary border-2 border-primary": active,
                "text-inactive-foreground border-2 border-bw": !active,
              })}
            >
              <Icon name={icon} className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-bw-foreground text-bw">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return (
    <Button
      variant={"ghost"}
      className={clsx("flex justify-end gap-2 font-normal", {
        "text-primary border-2 border-primary": active,
        "text-inactive-foreground border-2 border-bw": !active,
      })}
    >
      <div>{label}</div>
      <Icon name={icon} className="h-5 w-5" />
    </Button>
  );
}

export default MenuItem;
