import { useQuery } from "@tanstack/react-query";
import { getServiceById } from "../../../api/services.api";
import { serviceQueryKey } from "../hooks/queryKeys";

export function useService(serviceId) {
  return useQuery({
    queryKey: serviceQueryKey(serviceId),
    queryFn: () => getServiceById(serviceId),
    enabled: Boolean(serviceId), // prevents accidental calls
  });
}