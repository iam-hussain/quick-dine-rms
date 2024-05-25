import React from "react";
import { useSelector } from "react-redux";

import useOrderQuery from "@/hooks/useOrderQuery";
import { RootState } from "@/store";

import RecentOrderItem from "../molecules/recent-order-item";

function RecentOrderCollection() {
  const recentOrders = useSelector(
    (state: RootState) => state.base.recentOrders
  );
  const { fetch } = useOrderQuery();

  const handleOnClick = async (id: string) => {
    await fetch(id);
  };

  return (
    <div className="flex gap-2">
      {recentOrders.map((order) => (
        <RecentOrderItem key={order.id} order={order} onClick={handleOnClick} />
      ))}
    </div>
  );
}

export default RecentOrderCollection;
