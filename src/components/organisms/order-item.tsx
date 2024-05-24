"use client";

import { OrderAPIType } from "@/types";
import { dateTimeFormat } from "@/lib/date-time";
import OrderStatusIcon from "../molecules/order-status-icon";
import OrderTypeIcon from "../molecules/order-type-icon";
import useCartSummary from "@/hooks/useCartSummary";
import { Separator } from "../atoms/separator";

export default function OrderItem({
  order,
  onItemClick,
}: {
  order: OrderAPIType;
  onItemClick: (id: string) => void;
}) {
  const { subTotal, packagingCharge, deliveryCharge, taxesValue, grandTotal } =
    useCartSummary({
      items: order?.items?.summary || [],
    });

  return (
    <div
      key={order.id}
      className="rounded-lg h-auto p-4 px-6 flex justify-between align-middle w-auto gap-6 hover:border-primary cursor-pointer border border-accent"
      onClick={() => onItemClick(order.shortId)}
    >
      <div className="flex flex-col justify-center align-middle items-start gap-4 grow min-w-[200px]">
        <h3 className="text-xl font-medium">#{order.shortId}</h3>
      </div>
      {/* <div className="flex gap-2 flex-wrap justify-end align-middle items-end"></div> */}
      <div className="flex text-base font-medium text-foreground/80">
        <Separator orientation="vertical" className="bg-accent h-full" />
        <OrderStatusIcon
          value={order.status}
          classNames="text-foreground/90"
          withLabel={true}
          wrapperClassNames="border-none"
        />
        <Separator orientation="vertical" className="bg-accent h-full" />
        {order?.type && (
          <OrderTypeIcon
            value={order.type}
            classNames="text-foreground/90"
            withLabel={true}
            wrapperClassNames="border-none"
          />
        )}

        <Separator orientation="vertical" className="bg-accent h-full" />
        <p className="p-2 font-bold min-w-[150px] text-center bg-background">
          <span className="font-normal mr-2 text-sm">Draft: </span>
          {order.items.drafted.length}
        </p>
        <Separator orientation="vertical" className="bg-accent h-full" />

        <p className="p-2 font-bold min-w-[150px] text-center bg-background">
          <span className="font-normal mr-2 text-sm">Items: </span>
          {order.items.summary.reduce(
            (count, item) => count + item.quantity,
            0
          )}
        </p>
        <Separator orientation="vertical" className="bg-accent h-full" />
        <p className="p-2 font-bold min-w-[200px] text-center bg-background">
          <span className="font-normal mr-2 text-sm">SubTotal: </span>
          {Number(subTotal).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>
        <Separator orientation="vertical" className="bg-accent h-full" />
        <p className="p-2 font-bold min-w-[200px] text-center bg-background">
          <span className="font-normal mr-2 text-sm">Total: </span>
          {Number(grandTotal).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>
        <Separator orientation="vertical" className="bg-accent h-full" />

        <p className="p-2 font-bold min-w-[300px] text-center bg-background">
          <span className="font-normal mr-2 text-sm">Updated: </span>
          {dateTimeFormat(order?.updatedAt || "")}
        </p>
      </div>
      {/* <div className="flex m-auto gap-2 text-base font-medium text-foreground/80">
        <p className="text-foreground/90 font-medium text-base w-full text-right">
          <span className="text-foreground/80 text-sm">Created @ </span>{" "}
          {dateTimeFormat(order?.createdAt || "")}
        </p>
        <p className="text-foreground/90 font-medium text-base w-full text-right">
          <span className="text-foreground/80 text-sm">Updated @ </span>{" "}
          {dateTimeFormat(order?.updatedAt || "")}
        </p>
      </div> */}
      {/* 
      <div className="flex h-full">
        <Button
          variant={"secondary"}
          onClick={() => onItemClick(order.shortId)}
          className="h-full"
        >
          Open
        </Button>
      </div> */}
    </div>
  );
}
