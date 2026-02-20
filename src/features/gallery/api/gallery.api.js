import { http } from "../../../api/httpClient";

export const galleryApi = {
  getGalleryImages: () => http("admin/gallery"),
};
