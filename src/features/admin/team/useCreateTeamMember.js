import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../../team/api/team.api.js";
import { teamMembersQueryKey } from "../hooks/queryKeys.js";

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamMembersQueryKey,
      });
    },
  });
};
