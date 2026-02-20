import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "../../services/api/services.api";
import { serviceQueryKey } from "../hooks/queryKeys";

export function useService(serviceId) {
  return useQuery({
    queryKey: serviceQueryKey(serviceId),
    queryFn: () => servicesApi.getServiceById(serviceId),
    enabled: Boolean(serviceId), // prevents accidental calls
  });
}