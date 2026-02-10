import { http } from "./httpClient";
import { API } from "./index";

const BASE = `${API}admin/gallery`;

export const getGalleryImages = () => {
  return http(BASE);
};