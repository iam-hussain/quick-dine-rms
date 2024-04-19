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
import ItemsList from "../molecules/items-list";
import { KitchenDispatch } from "./kitchen-dispatch";
import { BillOut } from "./bill-out";
import OrderDetails from "../molecules/order-details";
import OrderTypeSelect from "../molecules/order-type-select";

function TableSelection({
  className,
  control,
}: {
  className?: string;
  control: Control<OrderUpsertSchemaType>;
}) {
  const [openTable, setOpenTable] = React.useState(false);
  const {
    enableTables,
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

  if(!enableTables && !table?.key)  {
    return <></>
  }

  return (
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
        
  );
}

export default TableSelection;
