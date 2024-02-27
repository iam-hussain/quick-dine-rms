import React from "react";
import clsx from "clsx";
import Icon from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";
import { useFullScreenHandle } from "react-full-screen";

function FullScreenButton({ onClick }: { onClick: () => Promise<void> }) {
  const handle = useFullScreenHandle();

  return (
    <Button
      variant={"transparent"}
      className={clsx("flex font-normal", {})}
      onClick={() => onClick()}
    >
      <Icon
        name={handle.active ? "MdFullscreenExit" : "MdFullscreen"}
        className={"h-5 w-5"}
      />
    </Button>
  );
}

export default FullScreenButton;
