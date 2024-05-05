import fetcher from "@/lib/fetcher";
import { RootState } from "@/store";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function usePOSCart() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { reset } = useFormContext<OrderUpsertSchemaType>();
  const { enableTables, enableCustomerAdding } = useSelector(
    (state: RootState) => state.base.featureFlags
  );

  const upsertOrderMutation = useMutation({
    mutationFn: (variables) => fetcher.post("/store/order", variables),
    onSuccess: async (data: any, variables: OrderUpsertSchemaType) => {
      console.log({ data, variables });
      // setValue("items", []);
      if (variables.shortId) {
        toast.success(
          `Order ID ${data.shortId} has been successfully updated! 🚀`
        );
      } else {
        router.push(`/store/pos?orderId=${data.shortId}`);
        toast.success(
          `A new order with ID ${data.shortId} has been created! 🌟`
        );
      }
      reset({
        ...data,
        ...variables,
        items: variables.items.filter(
          (e) => !e.status || e?.status === "DRAFT"
        ),
      });
      await queryClient.invalidateQueries({
        queryKey: [`order_${data.shortId}`],
      });
    },
    onError: (error, variables: OrderUpsertSchemaType) => {
      console.error(error);
      if (variables.shortId) {
        toast.success(
          `Unable to update order with ID ${variables.shortId}. Please review the entered information and try again. If the issue persists, contact support for further assistance`
        );
      } else {
        toast.success(
          "Failed to create order. Please verify the provided details and attempt again. If the problem persists, reach out to support for additional help."
        );
      }
    },
  });

  const upsert = ({ table, ...variables }: OrderUpsertSchemaType) => {
    // const { fees, shortId, type, status } = order || {};
    return upsertOrderMutation.mutateAsync({
      // ...(shortId ? { shortId } : {}),
      // ...(type ? { type } : {}),
      // ...(status ? { status } : {}),
      // ...(fees ? { fees } : {}),
      // // ...(enableTables && order?.table?.key ? { table: order?.table } : {}),
      ...variables,
      ...(enableTables && table?.key ? { table } : {}),
      ...(enableCustomerAdding ? {} : {}),
    });
  };

  return { upsert };
}
export default usePOSCart;
