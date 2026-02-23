import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "../../services/api/services.api";
import { servicesQueryKey } from "../hooks/queryKeys";

export function useServices() {
  return useQuery({
    queryKey: servicesQueryKey,
    queryFn: servicesApi.getServices,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10,
  });
}
