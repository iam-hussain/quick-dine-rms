import { useStoreStore } from "@/stores/storeSlice";
import { ScrollArea } from "@/components/atoms/scroll-area";
import clsx from "clsx";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import React from "react";
import {
  Control,
  useWatch,
  useController,
  useFieldArray,
} from "react-hook-form";
import CartItem from "@/components/molecules/cart-item";
import { Separator } from "@/components/atoms/separator";
import useCart from "@/hooks/useCart";
import { StoreAdditionalType } from "@/types";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import ItemsList from "../molecules/items-list";
import { KitchenDispatch } from "./kitchen-dispatch";
import { BillOut } from "./bill-out";
import OrderDetails from "../molecules/order-details";
import OrderTypeSelect from "../molecules/order-type-select";
import TableSelection from "./table-selection";
import CartSummaryItem from "../molecules/cart-summary-item";

function CartSummary({
  className,
  control,
  order,
}: {
  order: any;
  className?: string;
  control: Control<OrderUpsertSchemaType>;
}) {
  const {
    shouldAddPackingCharge,
    shouldAddDeliveryCharge,
    subTotal,
    deliveryCharge,
    packagingCharge,
    items,
    taxesValue,
    grandTotal,
    showPushToKot,
    allItems,
    scheduledItems,
    placedItems,
    acceptedItems,
    preparedItems,
  } = useCart({ control, order });
  const [openTable, setOpenTable] = React.useState(false);
  const {
    enableTables,
    enableCustomerAdding,
    enableExpressOrder,
    showUpdatedDate,
    enableKDS,
  } = useStoreStore((state) => state.featureFlags);

  const { tables } = useStoreStore(
    (state: { settings: StoreAdditionalType }) => state.settings
  );

  const table = useWatch({
    control,
    name: "table",
    defaultValue: undefined,
  });

  const {
    field: { onChange: onTableChange },
  } = useController({
    control,
    name: "table",
  });

  const { remove, update } = useFieldArray({
    control,
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

  const showExpressOption = React.useMemo(() => {
    if (enableExpressOrder) {
      return true;
    }
    if (!enableExpressOrder && order?.shortId) {
      return true;
    }
    return false;
  }, [enableExpressOrder, order?.shortId]);

  return (
    <div className={clsx("flex gap-2", className)}>
      <div className="flex flex-col px-4 gap-2">

         <OrderDetails order={order} />
        <Separator />
        <div className="flex justify-between gap-4">
         <OrderTypeSelect control={control}  />

          <div className="flex justify-between align-middle items-center gap-2">
            <TableSelection control={control} />
            {enableCustomerAdding && (
              <ButtonToolTip
                label="Link Customer"
                icon="IoPersonAddSharp"
                variant="outline"
              />
            )}
          </div>
        </div>
        <Separator />
      </div>
      <ScrollArea className="w-full flex justify-end grow bg-background px-4 pb-1 cart">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4 pt-2 justify-between h-full">
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

            {!enableKDS && <ItemsList label="Ordered" items={allItems} />}

            {enableKDS && (
              <>
                <ItemsList label="Scheduled" items={scheduledItems} />
                <ItemsList label="Placed" items={placedItems} />
                <ItemsList label="Accepted" items={acceptedItems} />
                <ItemsList label="Completed" items={preparedItems} />
              </>
            )}
          </div>
        </div>
      </ScrollArea>
      <Separator />
      <div className="flex justify-center align-middle items-center gap-4 flex-col text-sm bg-background select-none h-auto px-4">
        <div className="flex flex-col justify-center align-middle items-center w-full text-sm text-foreground/80">
          <CartSummaryItem name="Subtotal" price={subTotal} />
          {shouldAddPackingCharge && (
            <CartSummaryItem name="Packaging" price={packagingCharge} />
       
          )}

          {shouldAddDeliveryCharge && (
                 <CartSummaryItem name="Delivery" price={deliveryCharge} />
       
          )}

          {taxesValue &&
            taxesValue.map(
              (e: { key: string; name: string; amount: any }, i: any) => (
                <CartSummaryItem key={e.key} name={e.name} price={e.amount} />
              )
            )}
<CartSummaryItem name="Grand Total" price={grandTotal} />
         
        </div>
        <div className="flex gap-2 w-full">
          <ButtonToolTip
            label="Discord/Cancel"
            icon="MdDeleteOutline"
            variant={"outline"}
            className="text-destructive"
            disabled={!order?.shortId}
          />
          <ButtonToolTip
            label="Draft Order"
            icon="FaSave"
            variant={"outline"}
            type="submit"
          />

          {showPushToKot && (
            <KitchenDispatch btnClassName="w-full col-span-2"  items={items} fetched={order}/>
          )}

          <BillOut  btnClassName="w-full col-span-2"  items={items} fetched={order}/>
         
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
