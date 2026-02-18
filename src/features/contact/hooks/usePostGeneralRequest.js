import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postGeneralRequest } from "../../../api/requests.api";

export function usePostGeneralRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postGeneralRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generalRequests"] });
    },
  });
}
