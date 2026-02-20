import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../../team/api/team.api";
import { teamMemberQueryKey, teamMembersQueryKey } from "../hooks/queryKeys.js";

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: teamApi.updateTeamMember,
      onSuccess: (updatedMember) => {
        queryClient.setQueryData(
          teamMemberQueryKey(updatedMember._id),
          updatedMember
        );
        queryClient.invalidateQueries({
          queryKey: teamMembersQueryKey,
          refetchType: "all",
        });
      },
    });
};
