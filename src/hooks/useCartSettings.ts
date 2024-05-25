import { ORDER_TYPE, OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import { useFormContext, useWatch } from "react-hook-form";

function useCartSettings() {
  const { control } = useFormContext<OrderUpsertSchemaType>();

  const type = useWatch({
    control,
    name: "type",
    defaultValue: ORDER_TYPE.Values.TAKE_AWAY as any,
  });

  const shouldAddPackingCharge =
    type &&
    [
      ORDER_TYPE.Values.DELIVERY,
      ORDER_TYPE.Values.PLATFORM,
      ORDER_TYPE.Values.TAKE_AWAY,
    ].includes(type as any);

  const shouldAddDeliveryCharge = type === ORDER_TYPE.Values.DELIVERY;
  const showPushToKot = [ORDER_TYPE.Values.DINING].includes(type as any);

  return {
    shouldAddPackingCharge,
    shouldAddDeliveryCharge,
    showPushToKot,
  };
}
export default useCartSettings;
