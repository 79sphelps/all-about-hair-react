import { http } from "./httpClient";
import { API } from "./index";

const BASE = `${API}admin/homepage`;

export const getHomepageDetails = () => {
  return http(BASE);
};

export const updateHomepageDetails = ({ id, ...payload }) => {
  return http(`${BASE}/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};