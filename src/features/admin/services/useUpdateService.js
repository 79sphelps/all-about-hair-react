import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "../../services/api/services.api";
import { serviceQueryKey, servicesQueryKey } from "../hooks/queryKeys";

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesApi.updateService,
    onSuccess: (updatedService) => {
      queryClient.setQueryData(
        serviceQueryKey(updatedService._id),
        updatedService
      );
      queryClient.invalidateQueries({
        queryKey: servicesQueryKey,
        refetchType: "all",
      });
    },
  });
}