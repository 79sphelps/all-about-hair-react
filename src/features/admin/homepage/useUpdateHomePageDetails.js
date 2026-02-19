import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHomepageDetails } from "../../../api/homepage.api";
import { homepageDetailsQueryKey } from "../hooks/queryKeys";

export function useUpdateHomePageDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHomepageDetails,

    onSuccess: (updatedHomepage) => {
      // Keep cache in sync immediately
      queryClient.setQueryData(
        homepageDetailsQueryKey,
        [updatedHomepage]
      );

      // Ensure list refetch if backend mutates data
      queryClient.invalidateQueries({
        queryKey: homepageDetailsQueryKey,
      });
    },
  });
}
