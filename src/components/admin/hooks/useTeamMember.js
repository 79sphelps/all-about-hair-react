import { useQuery } from "@tanstack/react-query";
// import TeamService from "../../../api/team.service.js";
import { getTeamMemberById, getTeamMembers } from "../../../api/team.api";
import { teamMembersQueryKey, teamMemberQueryKey } from "./queryKeys";

/**
 * Fetch all team members
 */
export const useTeamMembers = () => {
  return useQuery({
    queryKey: teamMembersQueryKey,
    queryFn: getTeamMembers,
  });
};

/**
 * Fetch a single team member by ID
 */
export const useTeamMember = (id) => {
  return useQuery({
    queryKey: teamMemberQueryKey(id),
    queryFn: () => getTeamMemberById(id),
    enabled: Boolean(id), // prevents accidental calls
    // enabled: !!id, // prevents firing without an id
  });
};
