import { useQuery } from "@tanstack/react-query";
import { getGalleryImages } from "../../../api/gallery.api";
import { galleryQueryKey } from "./galleryQueryKeys";

export function useGalleryImages() {
  return useQuery({
    queryKey: galleryQueryKey,
    queryFn: getGalleryImages,
    staleTime: 1000 * 60 * 10, // 10 minutes (gallery rarely changes)
  });
}
