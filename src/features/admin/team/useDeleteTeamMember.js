import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../../team/api/team.api.js";
import { teamMemberQueryKey } from "../hooks/queryKeys.js";

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamMemberQueryKey,
        refetchType: "all",
      });
    },
  });
};
