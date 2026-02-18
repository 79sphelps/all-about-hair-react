import { useQuery } from "@tanstack/react-query";
import { getHomepageDetails } from "../../../api/homepage.api";
import { homepageDetailsQueryKey } from "./queryKeys";

export function useHomePageDetails() {
  return useQuery({
    queryKey: homepageDetailsQueryKey,
    queryFn: getHomepageDetails,
  });
}
