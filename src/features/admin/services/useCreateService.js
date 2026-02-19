import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "../../../api/services.api";
import { servicesQueryKey } from "../hooks/queryKeys";

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: servicesQueryKey,
      });
    },
  });
}
