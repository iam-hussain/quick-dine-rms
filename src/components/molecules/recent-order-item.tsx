import React from "react";

import { OrderAPIType } from "@/types";

import { Button } from "../atoms/button";

function RecentOrderItem({
  order,
  onClick,
}: {
  order: OrderAPIType;
  onClick: (id: string) => void;
}) {
  return (
    <Button variant={"outline"} onClick={() => onClick(order.shortId)}>
      <p className="text-sm font-medium">#{order.shortId}</p>
    </Button>
  );
}

export default RecentOrderItem;
