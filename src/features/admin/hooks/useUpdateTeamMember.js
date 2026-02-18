import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeamMember } from "../../../api/team.api.js";
import { teamMemberQueryKey, teamMembersQueryKey } from "./queryKeys";

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: updateTeamMember,
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
