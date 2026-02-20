import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { postGeneralRequest } from "../api/requests.api";
import { requestsApi } from "../api/requests.api";

export function usePostGeneralRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestsApi.postGeneralRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generalRequests"] });
    },
  });
}
