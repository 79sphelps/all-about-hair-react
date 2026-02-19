import { useHomePageDetails } from "../features/admin/homepage/useHomePageDetails";
import { useServices } from "../features/admin/services/useServices";
import { useTeamMembers } from "../features/admin/team/useTeamMember";

export function useHomePageBootstrap() {
  const home = useHomePageDetails();
  const services = useServices();
  const team = useTeamMembers();

  const isLoading =
    home.isLoading ||
    services.isLoading ||
    team.isLoading;

  const isError =
    home.isError ||
    services.isError ||
    team.isError;

  return {
    isLoading,
    isError,
    errors: {
      home: home.error,
      services: services.error,
      team: team.error,
    },
  };
}
