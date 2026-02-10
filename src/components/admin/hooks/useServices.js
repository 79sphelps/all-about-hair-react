import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../api/services.api";
import { servicesQueryKey } from "./queryKeys";

export function useServices() {
  return useQuery({
    queryKey: servicesQueryKey,
    queryFn: getServices,
  });
}
