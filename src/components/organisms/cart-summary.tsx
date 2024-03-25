import { Button } from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import { Separator } from "@/components/atoms/separator";
import { ScrollArea } from "@/components/atoms/scroll-area";
import clsx from "clsx";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import React from "react";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import schemas, { CartSchemaValues } from "@/validations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms/accordion";
import { Input } from "@/components/atoms/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/atoms/form";
import CartItem from "../molecules/cart-item";

const products: any[] = [];

const preparing: any[] = [];

const pendingProducts: any[] = [];

const defaultValues: Partial<CartSchemaValues> = {};

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
  return (
    <div className={clsx("flex gap-2", className)}>
      <div className="flex flex-col justify-between align-middle items-center bg-background gap-2 px-4 py-2">
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
      <ScrollArea className="w-full flex justify-end grow bg-background  px-4 py-2">
        <div className="flex flex-col">
          <ul className="flex flex-col gap-4">
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
      <div className="flex justify-center align-middle items-center gap-2 flex-col text-sm bg-background select-none h-auto px-4 py-2">
        <div className="grid grid-cols-5 gap-2 w-full">
          <ButtonToolTip
            label="View Summary"
            icon="MdSummarize"
            variant={"outline"}
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
