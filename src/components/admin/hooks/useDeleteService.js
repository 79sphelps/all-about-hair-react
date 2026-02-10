import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "../../../api/services.api";
// import { servicesQueryKey } from "./useServices";
import { servicesQueryKey } from "./queryKeys";

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: servicesQueryKey,
        refetchType: "all",
      });
    },
  });
}
