import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "../../services/api/services.api";
import { servicesQueryKey } from "../hooks/queryKeys";

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesApi.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: servicesQueryKey,
      });
    },
  });
}
