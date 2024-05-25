import { useMutation, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useCallback } from "react";
import { toast } from "sonner";

import fetcher from "@/lib/fetcher";

function useItemQuery() {
  const queryClient = useQueryClient();
  const updateItemMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: ({ id, tokenShortId, ...variables }) =>
      fetcher.post(`/store/order/item/${id}`, variables),
    onSuccess: async (order: any, variables: any) => {
      queryClient.invalidateQueries({
        queryKey: ["tokens"],
      });
      toast.success(
        `Item of the Token ID ${variables.tokenShortId} has been successfully updated! 🚀`
      );
    },
    onError: (error, variables: any) => {
      console.error(error);
      toast.success(
        `Unable to update item of the token ID ${variables.tokenShortId}. Please review the entered information and try again. If the issue persists, contact support for further assistance`
      );
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const update = useCallback(
    _.throttle((variables: any) => {
      if (!variables?.id || !variables?.tokenShortId || !variables?.orderId) {
        return false;
      }
      return updateItemMutation.mutateAsync(variables);
    }, 500),
    []
  );

  return { update };
}
export default useItemQuery;
