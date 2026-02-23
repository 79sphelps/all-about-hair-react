import { useQuery } from "@tanstack/react-query";
import { homepageApi } from "./api/homepage.api";
import { homepageDetailsQueryKey } from "../hooks/queryKeys";

export function useHomePageDetails() {
  return useQuery({
    queryKey: homepageDetailsQueryKey,
    queryFn: homepageApi.getHomepageDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10,
  });
}
