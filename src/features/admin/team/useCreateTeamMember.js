import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeamMember } from "../../../api/team.api.js";
import { teamMembersQueryKey } from "../hooks/queryKeys.js";

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamMembersQueryKey,
      });
    },
  });
};
