import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "../../services/api/services.api";
import { servicesQueryKey } from "../hooks/queryKeys";

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesApi.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: servicesQueryKey,
        refetchType: "all",
      });
    },
  });
}
