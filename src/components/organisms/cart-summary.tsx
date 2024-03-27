import { Button } from "@/components/atoms/button";
import { ScrollArea } from "@/components/atoms/scroll-area";
import clsx from "clsx";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import React, { useMemo } from "react";
import { useStoreStore } from "@/stores/storeSlice";
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import CartItem from "@/components/molecules/cart-item";
import { Separator } from "@/components/atoms/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/toggle-group";
import { CartFormType } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/atoms/form";
import {
  Select,
  SelectLabel,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { percentage } from "@/lib/utils";

function CartSummary({
  className,
  remove,
  register,
  fields,
  control,
  setValue,
  update,
}: {
  className?: string;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<CartFormType>;
  fields: FieldArrayWithId<CartFormType, "items", "id">[];
  control: Control<CartFormType, any, CartFormType>;
  setValue: UseFormSetValue<CartFormType>;
  update: UseFieldArrayUpdate<CartFormType, "items">;
}) {
  const { discounts, tax, delivery, packing } = useStoreStore(
    (state) => state.additional
  );

  const subTotal = useMemo(() => {
    const priceList = fields.map((e) => e.quantity * e.price);
    return priceList.length ? priceList.reduce((a, b) => a + b) : 0;
  }, [fields]);

  const packaging = useMemo(() => {
    return packing.type === "PERCENTAGE"
      ? percentage(packing.value, subTotal)
      : Number(packing.value);
  }, [packing.type, packing.value, subTotal]);

  const delivering = useMemo(() => {
    return delivery.type === "PERCENTAGE"
      ? percentage(delivery.value, subTotal)
      : Number(delivery.value);
  }, [delivery.type, delivery.value, subTotal]);

  const total = useMemo(() => {
    return subTotal ? subTotal + packaging + delivering : subTotal;
  }, [delivering, packaging, subTotal]);

  const taxValue = useMemo(() => {
    return tax.map((e) =>
      e.type === "PERCENTAGE" ? percentage(e.value, total) : Number(e.value)
    );
  }, [total, tax]);

  const grandTotal = useMemo(() => {
    return total + taxValue.reduce((a, b) => a + b);
  }, [total, taxValue]);

  return (
    <div className={clsx("flex gap-2", className)}>
      <div className="flex px-4">
        <FormField
          // className="w-auto"
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
              {/* <FormDescription>
                You can manage email addresses in your{" "}
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-sm text-right w-full">
          <p className="">Unsaved</p>
          <p className="text-foreground/80">Jan 10, 2022 10:44 AM</p>
        </div>
      </div>
      {/* <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem className="space-y-3 py-2 select-none">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-4"
              >
                <FormItem className="flex items-center space-x-2 space-y-0 justify-center align-middle">
                  <FormControl>
                    <RadioGroupItem value="PICK_UP" />
                  </FormControl>
                  <FormLabel className="font-normal">Express</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0 justify-center align-middle">
                  <FormControl>
                    <RadioGroupItem value="DINING" />
                  </FormControl>
                  <FormLabel className="font-normal">Dine In</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0 justify-center align-middle">
                  <FormControl>
                    <RadioGroupItem value="TAKE_AWAY" />
                  </FormControl>
                  <FormLabel className="font-normal">Pick Up</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0 justify-center align-middle">
                  <FormControl>
                    <RadioGroupItem value="DELIVERY" />
                  </FormControl>
                  <FormLabel className="font-normal">Delivery</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
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
            <ButtonToolTip
              label="Select Table"
              icon="MdTableRestaurant"
              variant={"outline"}
              // swapText="T5"
            />
          </div>
        </div>
        <Separator />
      </div>
      <ScrollArea className="w-full flex justify-end grow bg-background px-4 py-2">
        <div className="flex flex-col">
          <ul className="flex flex-col gap-4">
            {fields.length === 0 && (
              <li className="text-sm text-foreground/80 text-center w-full">
                No items found
              </li>
            )}
            {fields.map((item, index) => (
              <CartItem
                item={item}
                index={index}
                key={`cart_item_${index}`}
                onAddClick={(index, element) =>
                  update(index, { ...element, quantity: element.quantity + 1 })
                }
                onSubClick={(index, element) =>
                  update(index, { ...element, quantity: element.quantity - 1 })
                }
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

          {packaging && (
            <div className="flex gap-2 justify-between align-middle items-center w-full">
              <span>Packing Charge</span>
              <span>
                {Number(packaging).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
          )}

          {delivering && (
            <div className="flex gap-2 justify-between align-middle items-center w-full">
              <span>Delivery Charge</span>
              <span>
                {Number(delivering).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
          )}

          {tax &&
            tax.map((e, i) => (
              <div
                className="flex gap-2 justify-between align-middle items-center w-full"
                key={e.key}
              >
                <span>{e.name}</span>
                <span>
                  {Number(taxValue[i]).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>
              </div>
            ))}

          {/* <div className="flex gap-2 justify-between align-middle items-center w-full">
            <span>Discount</span>
            <span>₹ 0.00</span>
          </div> */}
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

          <Button className="w-full col-span-2">Complete Order</Button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
