import { useQuery } from "@tanstack/react-query";
import { homepageApi } from "./api/homepage.api";
import { homepageDetailsQueryKey } from "../hooks/queryKeys";

export function useHomePageDetails() {
  return useQuery({
    queryKey: homepageDetailsQueryKey,
    queryFn: homepageApi.getHomepageDetails,
  });
}
