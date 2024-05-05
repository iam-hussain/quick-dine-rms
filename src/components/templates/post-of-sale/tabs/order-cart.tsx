import { ScrollArea } from "@/components/atoms/scroll-area";
import { RootState } from "@/store";
import clsx from "clsx";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import CartItem from "@/components/molecules/cart-item";
import { Separator } from "@/components/atoms/separator";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import OrderTypeSelect from "../../../molecules/order-type-select";
import TableSelection from "../../../organisms/table-selection";
import { Button } from "../../../atoms/button";
import CartSummary from "../../../organisms/cart-summary";
import useCartSettings from "@/hooks/useCartSettings";
import DraftOrder from "../actions/draft-order";
import DeleteOrder from "../actions/delete-order";
import KitchenDispatch from "../actions/kitchen-dispatch";
import { useSelector } from "react-redux";

function OrderCart({ className }: { className?: string }) {
  const { watch } = useFormContext<OrderUpsertSchemaType>();
  const { enableCustomerAdding } = useSelector(
    (state: RootState) => state.base.featureFlags
  );
  const { showPushToKot } = useCartSettings();

  const items = watch("items", []);
  const { remove, update } = useFieldArray({
    name: "items",
  });

  const handleQuantityClick = (type: "ADD" | "SUB" = "ADD", index: number) => {
    if (type === "SUB" && items[index].quantity === 0) {
      return;
    }
    update(index, {
      ...items[index],
      quantity:
        type == "ADD" ? items[index].quantity + 1 : items[index].quantity - 1,
    });
  };

  return (
    <div className={clsx("flex flex-col h-full gap-1", className)}>
      <div className="flex justify-between gap-4 px-4">
        <OrderTypeSelect />
        <div className="flex justify-between align-middle items-center gap-2">
          <TableSelection />
          {enableCustomerAdding && (
            <ButtonToolTip
              label="Link Customer"
              icon="IoPersonAddSharp"
              variant="outline"
            />
          )}
        </div>
      </div>
      <Separator className="my-4" />
      <ScrollArea className="w-full flex justify-end grow bg-background px-4 h-0 cart">
        <ul className="flex flex-col gap-2">
          {items.length === 0 ? (
            <li className="text-sm text-foreground/80 text-center w-full py-6">
              No items found
            </li>
          ) : (
            <></>
          )}
          {items.map((item, index) => (
            <CartItem
              item={item}
              index={index}
              key={`cart_item_${index}`}
              onAddClick={(index) => handleQuantityClick("ADD", index)}
              onSubClick={(index) => handleQuantityClick("SUB", index)}
              onRemoveClick={(index) => remove(index)}
            />
          ))}
        </ul>
        {/* {drafted.length && <DraftItems items={drafted} />} */}
      </ScrollArea>
      <Separator />
      <div className="flex justify-center align-middle items-center gap-4 flex-col text-sm bg-background select-none h-auto px-6">
        <CartSummary items={items as any} />
        <div className="flex gap-2 w-full">
          <DeleteOrder />
          <DraftOrder />
          <KitchenDispatch />
          {/* <Button className="w-full col-span-2" type="submit">
            Bill Out
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default OrderCart;
