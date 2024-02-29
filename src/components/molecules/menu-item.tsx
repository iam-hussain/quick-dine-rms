import React from "react";
import { Button } from "@/components/atoms/button";
import Icon, { IconKey } from "@/components/atoms/icon";
import clsx from "clsx";
import { motion } from "framer-motion";
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
  // if (minimize) {
  //   return (
  //     <TooltipProvider>
  //       <Tooltip>
  //         <TooltipTrigger asChild>
  //           <Button
  //             variant={"ghost"}
  //             className={clsx(
  //               "flex justify-center gap-2 font-norma px-1 py-1",
  //               {
  //                 "text-primary border-2 border-primary": active,
  //                 "text-inactive-foreground border-2 border-bw": !active,
  //               }
  //             )}
  //           >
  //             <Icon name={icon} className="h-5 w-5" />
  //           </Button>
  //         </TooltipTrigger>
  //         <TooltipContent className="bg-bw-foreground text-bw">
  //           <p>{label}</p>
  //         </TooltipContent>
  //       </Tooltip>
  //     </TooltipProvider>
  //   );
  // }

  const fader = {
    hide: { opacity: 0, scale: 0 },
    show: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <Button
      variant={"ghost"}
      className={clsx(
        "flex gap-2 font-normal hover:bg-paper hover:text-foreground justify-start align-middle items-center",
        {
          "text-primary bg-paper/70": active,
          "text-foreground/70": !active,
          "justify-center p-1": minimize,
          "justify-start": !minimize,
        }
      )}
    >
      <Icon name={icon} className="h-5 w-5" />
      <motion.div
        initial="hide"
        animate={minimize ? "hide" : "show"}
        variants={fader}
        className={clsx({
          hidden: minimize,
        })}
      >
        {label}
      </motion.div>
    </Button>
  );
}

export default MenuItem;
