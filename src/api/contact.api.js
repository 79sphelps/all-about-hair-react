import { http } from "./httpClient";
import { API } from "./index";

const BASE = `${API}admin/contact`;

export const getContactInfo = () => {
  return http(BASE);
};
