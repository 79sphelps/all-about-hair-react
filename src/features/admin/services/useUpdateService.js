import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateService } from "../../../api/services.api";
import { serviceQueryKey, servicesQueryKey } from "../hooks/queryKeys";

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateService,
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