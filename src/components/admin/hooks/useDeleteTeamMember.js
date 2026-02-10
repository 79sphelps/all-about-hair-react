import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeamMember } from "../../../api/team.api.js";
import { teamMemberQueryKey } from "./queryKeys";

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamMemberQueryKey,
        refetchType: "all",
      });
    },
  });
};
