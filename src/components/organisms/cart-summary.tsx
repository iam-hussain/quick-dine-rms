import { Button } from "@/components/atoms/button";
import { ScrollArea } from "@/components/atoms/scroll-area";
import clsx from "clsx";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import React, { useMemo } from "react";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import CartItem from "@/components/molecules/cart-item";
import { Separator } from "@/components/atoms/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/toggle-group";

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
  register: UseFormRegister<{
    items: {
      price: number;
      title: string;
      note: string;
      quantity: number;
      productId: string;
    }[];
  }>;
  fields: FieldArrayWithId<
    {
      items: {
        price: number;
        title: string;
        note: string;
        quantity: number;
        productId: string;
      }[];
    },
    "items",
    "id"
  >[];
  control: Control<
    {
      items: {
        price: number;
        title: string;
        note: string;
        quantity: number;
        productId: string;
      }[];
    },
    any,
    {
      items: {
        price: number;
        title: string;
        note: string;
        quantity: number;
        productId: string;
      }[];
    }
  >;
  setValue: UseFormSetValue<{
    items: {
      price: number;
      title: string;
      note: string;
      quantity: number;
      productId: string;
    }[];
  }>;
  update: UseFieldArrayUpdate<
    {
      items: {
        price: number;
        title: string;
        note: string;
        quantity: number;
        productId: string;
      }[];
    },
    "items"
  >;
}) {
  const subTotal = useMemo(() => {
    const priceList = fields.map((e) => e.quantity * e.price);
    return priceList.length ? priceList.reduce((a, b) => a + b) : 0;
  }, [fields]);

  const taxValue = useMemo(() => {
    return subTotal * 0.05;
  }, [subTotal]);

  const grandTotal = useMemo(() => {
    return subTotal + taxValue;
  }, [subTotal, taxValue]);

  return (
    <div className={clsx("flex gap-2", className)}>
      <div className="flex flex-col justify-between align-middle items-center bg-background gap-3 px-4 py-2">
        <ToggleGroup
          type="single"
          className="grid grid-cols-4 w-full select-none"
        >
          <ToggleGroupItem
            value="express"
            aria-label="Express Order"
            variant={"outline"}
          >
            <p>Express</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="dineIn"
            aria-label="Dine In Order"
            variant={"outline"}
          >
            <p>Dine In</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="takeAway"
            aria-label="Take Away Order"
            variant={"outline"}
          >
            <p>Pickup</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="delivery"
            aria-label="Delivery Order"
            variant={"outline"}
          >
            <p>Delivery</p>
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator />
        <div className="flex text-sm flex-row justify-between w-full">
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
      </div>
      <Separator />
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

          {/* <div className="flex gap-2 justify-between align-middle items-center w-full">
            <span>Packing Charge</span>
            <span>₹ 0.00</span>
          </div>

          <div className="flex gap-2 justify-between align-middle items-center w-full">
            <span>Delivery Charge</span>
            <span>₹ 0.00</span>
          </div> */}
          <div className="flex gap-2 justify-between align-middle items-center w-full">
            <span>Tax</span>
            <span>
              {Number(taxValue).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
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
