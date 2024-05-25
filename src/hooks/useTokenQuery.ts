import { useMutation, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useCallback } from "react";
import { toast } from "sonner";

import fetcher from "@/lib/fetcher";

function useTokenQuery() {
  const queryClient = useQueryClient();
  const updateTokenMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: ({ id, shortId, ...variables }) =>
      fetcher.patch(`/store/token/${id}`, variables),
    onSuccess: async (_data: any, variables: any) => {
      queryClient.invalidateQueries({
        queryKey: ["tokens"],
      });
      toast.success(
        `Token ID ${variables.shortId.split("-")[1]} of the order ID ${variables.shortId} has been successfully updated! 🚀`
      );
    },
    onError: (error, variables) => {
      console.error(error);
      toast.success(
        `Unable to update token with ID ${variables.shortId.split("-")[1]} of the order ID ${variables.orderId}. Please review the entered information and try again. If the issue persists, contact support for further assistance`
      );
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const update = useCallback(
    _.throttle((variables: any) => {
      if (!variables?.id || !variables?.shortId || !variables?.orderId) {
        return false;
      }
      return updateTokenMutation.mutateAsync(variables);
    }, 1000),
    []
  );

  return { update };
}
export default useTokenQuery;
