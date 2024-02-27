import React from "react";
import { Button, ButtonProps } from "@/components/atoms/button";
import Icon, { IconKey } from "@/components/atoms/icon";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";

type ButtonToolTip = {
  label: string;
  icon: IconKey;
} & ButtonProps;

function ButtonToolTip({ label, icon, ...buttonProps }: ButtonToolTip) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            className={clsx("flex justify-center gap-2 font-normal text-lg")}
            {...buttonProps}
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

export default ButtonToolTip;
