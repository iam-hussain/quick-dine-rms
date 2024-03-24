import { zodResolver } from "@hookform/resolvers/zod";
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
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/atoms/input-otp";
import schemas, { CartSchemaValues } from "@/validations";
import { FormControl, FormField, FormItem } from "../atoms/form";

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
          <ul className="flex flex-col gap-2">
            {fields.map((item, index) => (
              <li
                key={item.id}
                className={clsx(
                  "flex justify-center items-center align-middle gap-4 rounded-md text-sm font-medium text-inactive",
                  {
                    "border-b pb-2": fields.length !== index + 1,
                  }
                )}
              >
                <span className="grow">{item.title}</span>
                <div className="flex justify-center align-middle items-center text-center border border-paper">
                  <Button
                    // className="p-1"
                    variant={"ghost"}
                    disabled={item.quantity === 1}
                    onClick={() =>
                      update(index, { ...item, quantity: item.quantity - 1 })
                    }
                  >
                    <Icon name="RiSubtractFill" />
                  </Button>
                  <span className="min-w-6 select-none">{item.quantity}</span>
                  <Button
                    // className="p-1"
                    variant={"ghost"}
                    disabled={item.quantity > 10000}
                    onClick={() =>
                      update(index, { ...item, quantity: item.quantity + 1 })
                    }
                  >
                    <Icon name="IoMdAdd" />
                  </Button>
                </div>
                <span className="min-w-16 flex justify-end">
                  ₹ {item.price}
                </span>
                <Button
                  variant={"transparent"}
                  className="p-2"
                  onClick={() => remove(index)}
                >
                  <Icon name="TiDelete" className="h-6 w-6 text-destructive" />
                </Button>
              </li>
            ))}
          </ul>

          {products.map((each, i) => (
            <React.Fragment key={`pd_${i}`}>
              <div className="flex justify-center items-center align-middle gap-4 rounded-md text-sm font-medium text-inactive">
                <span className="grow">{each.name}</span>
                <div className="flex justify-center align-middle items-center text-center border border-paper">
                  <Button className="p-1" variant={"ghost"} disabled>
                    <Icon name="RiSubtractFill" />
                  </Button>
                  <span className="min-w-6">1</span>
                  <Button className="p-1" variant={"ghost"} disabled>
                    <Icon name="IoMdAdd" />
                  </Button>
                </div>
                <span className="min-w-16 flex justify-end">
                  ₹ {each.price.toFixed(2)}
                </span>

                <ButtonToolTip
                  className="text-bw-foreground"
                  label={i > 1 ? "Cooked" : "Cooking"}
                  icon={i > 1 ? "PiCookingPot" : "PiCookingPotFill"}
                  variant={"transparent"}
                />
              </div>
              {products.length - 1 !== i && <Separator className={"my-2"} />}
            </React.Fragment>
          ))}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Kitchen Pending
              </span>
            </div>
          </div>

          {preparing.map((each, i) => (
            <React.Fragment key={`PE_${i}`}>
              <div className="flex justify-center items-center align-middle gap-4 rounded-md text-sm font-medium">
                <span className="grow">{each.name}</span>
                <div className="flex justify-center align-middle items-center text-center border border-paper">
                  <Button className="p-1" variant={"ghost"} disabled>
                    <Icon name="RiSubtractFill" />
                  </Button>
                  <span className="min-w-6">1</span>
                  <Button className="p-1" variant={"ghost"} disabled>
                    <Icon name="IoMdAdd" />
                  </Button>
                </div>
                <span className="min-w-16 flex justify-end">
                  ₹ {each.price.toFixed(2)}
                </span>
                <Button variant={"transparent"} className="p-2">
                  <Icon name="TiDelete" className="h-6 w-6" />
                </Button>
              </div>
              {preparing.length - 1 !== i && <Separator className={"my-2"} />}
            </React.Fragment>
          ))}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Items Addons
              </span>
            </div>
          </div>

          {pendingProducts.map((each, i) => (
            <React.Fragment key={`PP_${i}`}>
              <div className="flex justify-center items-center align-middle gap-4 rounded-md text-sm font-medium">
                <span className="grow">{each.name}</span>
                <div className="flex justify-center align-middle items-center text-center border border-paper">
                  <Button className="p-1" variant={"ghost"}>
                    <Icon name="RiSubtractFill" />
                  </Button>
                  <span className="min-w-6">1</span>
                  <Button className="p-1" variant={"ghost"}>
                    <Icon name="IoMdAdd" />
                  </Button>
                </div>
                <span className="min-w-16 flex justify-end">
                  ₹ {each.price.toFixed(2)}
                </span>
                <Button variant={"transparent"} className="p-2">
                  <Icon name="TiDelete" className="h-6 w-6" />
                </Button>
              </div>
              {pendingProducts.length - 1 !== i && (
                <Separator className={"my-2"} />
              )}
            </React.Fragment>
          ))}
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
