import { useQuery } from "@tanstack/react-query";
import { teamApi } from "../../team/api/team.api";
import { teamMembersQueryKey, teamMemberQueryKey } from "../hooks/queryKeys";

/**
 * Fetch all team members
 */
export const useTeamMembers = () => {
  return useQuery({
    queryKey: teamMembersQueryKey,
    queryFn: teamApi.getTeamMembers,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10,
  });
};

/**
 * Fetch a single team member by ID
 */
export const useTeamMember = (id) => {
  return useQuery({
    queryKey: teamMemberQueryKey(id),
    queryFn: () => teamApi.getTeamMember(id),
    enabled: Boolean(id), // prevents accidental calls
    // enabled: !!id, // prevents firing without an id
  });
};
