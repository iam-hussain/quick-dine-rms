"use client";

import { useQuery } from "@tanstack/react-query";

import Loader from "@/components/molecules/loader";
import fetcher from "@/lib/fetcher";
import { ORDER_STATUS, OrderAPIType } from "@/types";

import { Separator } from "../atoms/separator";
import OrderItem from "./order-item";

export default function OrderCollection({
  onItemClick,
}: {
  onItemClick?: (shortId: string) => void;
}) {
  const {
    data: orders,
    isPending,
    isLoading,
  } = useQuery<OrderAPIType[]>({
    queryKey: ["tokens"],
    queryFn: () => fetcher(`/store/orders/open`),
  });
  if (isPending || isLoading || !orders || !Array.isArray(orders)) {
    return <Loader />;
  }

  const onItemClickHandler = (shortId: string) => {
    if (onItemClick) {
      onItemClick(shortId);
    }
  };

  if (orders.length === 0) {
    return (
      <p className="text-sm text-foreground/80 text-center w-full py-8 m-auto grow grid-cols-12">
        {"No orders found"}
      </p>
    );
  }

  const draftOrders = orders.filter((e) => e.status === ORDER_STATUS.DRAFT);
  const progressOrders = orders.filter(
    (e) => e.status === ORDER_STATUS.IN_PROGRESS
  );
  const deliveryOrders = orders.filter(
    (e) => e.status === ORDER_STATUS.DELIVERED
  );
  const inDeliveryOrders = orders.filter(
    (e) => e.status === ORDER_STATUS.DELIVERY_PENDING
  );
  const completedOrders = orders.filter(
    (e) => e.status === ORDER_STATUS.COMPLETED
  );

  return (
    <div className="flex align-top items-start justify-center p-6 pb-20 rounded-lg gap-6 flex-wrap w-full">
      {Boolean(draftOrders.length) && (
        <div className="flex flex-col justify-center text-xl uppercase pb-2 w-full px-6">
          <span className="bg-background text-foreground/80">Draft</span>
          <Separator />
        </div>
      )}

      {draftOrders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onItemClick={onItemClickHandler}
        />
      ))}

      {Boolean(progressOrders.length) && (
        <div className="flex flex-col justify-center text-xl uppercase pb-2 w-full px-6">
          <span className="bg-background text-foreground/80">In Progress</span>
          <Separator />
        </div>
      )}

      {progressOrders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onItemClick={onItemClickHandler}
        />
      ))}

      {Boolean(deliveryOrders.length) && (
        <div className="flex flex-col justify-center text-xl uppercase pb-2 w-full px-6">
          <span className="bg-background text-foreground/80">
            Ready to Delivery
          </span>
          <Separator />
        </div>
      )}

      {deliveryOrders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onItemClick={onItemClickHandler}
        />
      ))}

      {Boolean(inDeliveryOrders.length) && (
        <div className="flex flex-col justify-center text-xl uppercase pb-2 w-full px-6">
          <span className="bg-background text-foreground/80">
            In Delivery Process
          </span>
          <Separator />
        </div>
      )}

      {inDeliveryOrders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onItemClick={onItemClickHandler}
        />
      ))}
      {Boolean(completedOrders.length) && (
        <div className="flex flex-col justify-center text-xl uppercase pb-2 w-full px-6">
          <span className="bg-background text-foreground/80">
            Recently Completed
          </span>
          <Separator />
        </div>
      )}

      {completedOrders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onItemClick={onItemClickHandler}
        />
      ))}
    </div>
  );
}
