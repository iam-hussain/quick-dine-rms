import { useStoreStore } from "@/stores/storeSlice";
import { Button } from "@/components/atoms/button";
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
import { FormField, FormItem, FormMessage } from "@/components/atoms/form";
import {
  Select,
  SelectLabel,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import useCart from "@/hooks/useCart";
import { CartSchemaValues } from "@/validations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import Icon from "@/components/atoms/icon";
import { StoreAdditionalType } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/toggle-group";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";

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
    orderedItems,
    showPushToKot,
    type,
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
      <div className="flex flex-col px-4">
        <div className="flex justify-between gap-4 py-2">
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem className="min-w-32">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select a order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Order Type</SelectLabel>
                      {showExpressOption && (
                        <SelectItem value="PICK_UP">Express</SelectItem>
                      )}
                      <SelectItem value="DINING">Dine In</SelectItem>
                      <SelectItem value="TAKE_AWAY">Take Away</SelectItem>
                      <SelectItem value="DELIVERY">Delivery</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between align-middle items-center gap-2">
            {enableTables && showPushToKot && (
              <Dialog open={openTable} onOpenChange={setOpenTable}>
                <DialogTrigger asChild>
                  <Button
                    variant={table?.key ? "accent" : "outline"}
                    className={clsx(
                      "flex justify-center gap-2 font-normal text-lg"
                    )}
                  >
                    {table?.name ? (
                      <p className="font-bold text-base">{table?.name}</p>
                    ) : (
                      <Icon name={"MdTableRestaurant"} className="h-5 w-5" />
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Select Table</DialogTitle>
                  </DialogHeader>
                  <div className="flex gap-4 py-4 justify-center">
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      className="flex items-center gap-4 justify-center flex-wrap"
                      value={table?.key || ""}
                    >
                      <ToggleGroupItem
                        value={""}
                        aria-label={"None"}
                        className="text-2xl px-4 py-8"
                        onClick={() => {
                          onTableChange({});
                          setOpenTable(false);
                        }}
                      >
                        <div>--</div>
                      </ToggleGroupItem>
                      {tables.map((e, i) => (
                        <ToggleGroupItem
                          value={e.key}
                          aria-label={e.name}
                          key={`table_${i}`}
                          className="text-2xl px-4 py-8"
                          onClick={() => {
                            onTableChange(e);
                            setOpenTable(false);
                          }}
                        >
                          <div>{e.name}</div>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </div>
                </DialogContent>
              </Dialog>
            )}
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
        <div className="flex gap-2 text-sm flex-row justify-between w-full py-2">
          <div>
            {enableCustomerAdding && (
              <p className="font-medium">
                {order?.customerId ? order.customerId : "Unknown Name"}
              </p>
            )}
            {order?.shortId && (
              <p className="text-foreground/80">
                Order: #{order?.shortId}
                {order?.table?.key ? ` / ${order?.table?.key}` : ""}
              </p>
            )}
          </div>

          <div className="text-sm text-right">
            <p className="">
              {order?.status || "Unsaved"}{" "}
              {order?.type ? ` / ${order.type}` : ""}
            </p>
            {showUpdatedDate && order?.updatedAt && (
              <p className="text-foreground/80">
                {new Date(order.updatedAt).toLocaleString()}
              </p>
            )}
            {!showUpdatedDate && order?.createdAt && (
              <p className="text-foreground/80">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <Separator />
      </div>
      <ScrollArea className="w-full flex justify-end grow bg-background px-4 py-2 cart">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-2 justify-between h-full">
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

            {!enableKDS && Boolean(orderedItems.length) && (
              <ul className="flex flex-col gap-2">
                {Boolean(orderedItems.length) && (
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Ordered
                      </span>
                    </div>
                  </div>
                )}

                {orderedItems.map((item: any) => (
                  <li
                    key={item.id}
                    className="flex justify-center items-center align-middle gap-2 text-sm font-medium text-inactive w-full"
                  >
                    <div className="grow">
                      <p className=" text-left text-foreground">{item.title}</p>
                    </div>

                    <div className="flex justify-center align-middle items-center gap-2 min-w-[90px]">
                      <span className="text-xs">
                        {Number(item.price).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                      <span>x</span>
                      <span className="select-none text-foreground text-center">
                        {item.quantity}
                      </span>
                    </div>
                    <span className="min-w-20 flex justify-end text-foreground">
                      {Number(item.price * item.quantity).toLocaleString(
                        "en-IN",
                        {
                          style: "currency",
                          currency: "INR",
                        }
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {enableKDS && (
              <>
                {Boolean(orderedItems.length) && (
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Cooking
                      </span>
                    </div>
                  </div>
                )}

                {orderedItems.map((item: any) => (
                  <li
                    key={item.id}
                    className="flex justify-center items-center align-middle gap-2 text-sm font-medium text-inactive w-full"
                  >
                    <div className="grow">
                      <p className=" text-left text-foreground">{item.title}</p>
                    </div>

                    <div className="flex justify-center align-middle items-center gap-2 min-w-[90px]">
                      <span className="text-xs">
                        {Number(item.price).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                      <span>x</span>
                      <span className="select-none text-foreground text-center">
                        {item.quantity}
                      </span>
                    </div>
                    <span className="min-w-20 flex justify-end text-foreground">
                      {Number(item.price * item.quantity).toLocaleString(
                        "en-IN",
                        {
                          style: "currency",
                          currency: "INR",
                        }
                      )}
                    </span>
                  </li>
                ))}
                {Boolean(orderedItems.length) && (
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Completed
                      </span>
                    </div>
                  </div>
                )}

                {orderedItems.map((item: any) => (
                  <li
                    key={item.id}
                    className="flex justify-center items-center align-middle gap-2 text-sm font-medium text-inactive w-full"
                  >
                    <div className="grow">
                      <p className=" text-left text-foreground">{item.title}</p>
                    </div>

                    <div className="flex justify-center align-middle items-center gap-2 min-w-[90px]">
                      <span className="text-xs">
                        {Number(item.price).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                      <span>x</span>
                      <span className="select-none text-foreground text-center">
                        {item.quantity}
                      </span>
                    </div>
                    <span className="min-w-20 flex justify-end text-foreground">
                      {Number(item.price * item.quantity).toLocaleString(
                        "en-IN",
                        {
                          style: "currency",
                          currency: "INR",
                        }
                      )}
                    </span>
                  </li>
                ))}
              </>
            )}
          </div>
        </div>
      </ScrollArea>
      <Separator />
      <div className="flex justify-center align-middle items-center gap-4 flex-col text-sm bg-background select-none h-auto px-4 py-2">
        <div className="flex flex-col justify-center align-middle items-center w-full text-sm text-foreground/80">
          <div className="flex gap-2 justify-between align-middle items-center w-full">
            <span>Subtotal</span>
            <span>
              {Number(subTotal).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>

          {shouldAddPackingCharge && (
            <div className="flex gap-2 justify-between align-middle items-center w-full">
              <span>Packaging</span>
              <span>
                {Number(packagingCharge).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
          )}

          {shouldAddDeliveryCharge && (
            <div className="flex gap-2 justify-between align-middle items-center w-full">
              <span>Delivery</span>
              <span>
                {Number(deliveryCharge).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
          )}

          {taxesValue &&
            taxesValue.map(
              (e: { key: string; name: string; amount: any }, i: any) => (
                <div
                  className="flex gap-2 justify-between align-middle items-center w-full"
                  key={e.key}
                >
                  <span>{e.name}</span>
                  <span>
                    {Number(e.amount).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </div>
              )
            )}

          <div className="flex gap-2 justify-between align-middle items-center w-full text-base text-foreground">
            <span>Grand Total</span>
            <span className="font-medium">
              {Number(grandTotal).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
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
            <Button
              className="w-full col-span-2"
              type="submit"
              variant={"secondary"}
            >
              Kitchen Dispatch
            </Button>
          )}

          <Button className="w-full col-span-2" type="submit">
            Bill Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
