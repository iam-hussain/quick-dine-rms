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

function Order({
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

    </div>

  );
}

export default Order;
