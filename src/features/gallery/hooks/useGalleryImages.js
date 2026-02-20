import { useQuery } from "@tanstack/react-query";
import { galleryApi } from "../api/gallery.api";
import { galleryQueryKey } from "./galleryQueryKeys";

export function useGalleryImages() {
  return useQuery({
    queryKey: galleryQueryKey,
    queryFn: galleryApi.getGalleryImages,
    staleTime: 1000 * 60 * 10, // 10 minutes (gallery rarely changes)
  });
}
