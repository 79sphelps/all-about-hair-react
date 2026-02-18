import { useQuery } from "@tanstack/react-query";
import { getContactInfo } from "../../../api/contact.api";
import { contactQueryKey } from "./contactQueryKeys";

export function useContactInfo() {
  return useQuery({
    queryKey: contactQueryKey,
    queryFn: getContactInfo,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
