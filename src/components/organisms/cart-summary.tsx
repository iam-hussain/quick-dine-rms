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
import { StoreAdditionalType } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/toggle-group";

function CartSummary({
  className,
  control,
}: {
  className?: string;
  control: Control<CartSchemaValues, any, CartSchemaValues>;
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
  } = useCart({ control });
  const [openTable, setOpenTable] = React.useState(false);

  const { tables } = useStoreStore(
    (state: { settings: StoreAdditionalType }) => state.settings
  );

  const table = useWatch({
    control,
    name: "table",
    defaultValue: {},
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

  return (
    <div className={clsx("flex gap-2", className)}>
      <div className="flex px-4">
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem className="min-w-32">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select a order type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Order Type</SelectLabel>
                    <SelectItem value="PICK_UP">Express</SelectItem>
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
        <div className="text-sm text-right w-full">
          <p className="">Unsaved</p>
          <p className="text-foreground/80">Jan 10, 2022 10:44 AM</p>
        </div>
      </div>
      <div className="flex flex-col px-4">
        <Separator />
        <div className="flex text-sm flex-row justify-between w-full py-2">
          <div>
            <p className="font-medium">Daniel Amir</p>
            <p className="text-foreground/80">Order: #JJ782328 / Table</p>
          </div>
          <div className="flex justify-between align-middle items-center gap-2">
            <ButtonToolTip
              label="Link Customer"
              icon="IoPersonAddSharp"
              variant="outline"
            />

            <Dialog open={openTable} onOpenChange={setOpenTable}>
              <DialogTrigger asChild>
                <ButtonToolTip
                  label="Select Table"
                  icon="MdTableRestaurant"
                  variant={"accent"}
                  swapText={table?.name}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Select Table</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4 py-4 justify-center">
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    className="flex items-center gap-4 justify-center"
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
                      <div>None</div>
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
          </div>
        </div>
        <Separator />
      </div>
      <ScrollArea className="w-full flex justify-end grow bg-background px-4 py-2">
        <div className="flex flex-col">
          <ul className="flex flex-col gap-4">
            {items.length === 0 && (
              <li className="text-sm text-foreground/80 text-center w-full">
                No items found
              </li>
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

          {/* <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Kitchen Pending
              </span>
            </div>
          </div> */}
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
        <div className="grid grid-cols-5 gap-2 w-full">
          <ButtonToolTip
            label="Discord/Cancel"
            icon="MdDeleteOutline"
            variant={"outline"}
            className="text-destructive"
          />
          <ButtonToolTip
            label="Draft Order"
            icon="RiDraftFill"
            variant={"outline"}
          />
          <ButtonToolTip
            label="Place Order"
            icon="GiCampCookingPot"
            variant={"outline"}
          />

          <Button className="w-full col-span-2" type="submit">
            Complete Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
