import { http } from "./httpClient";
import { API } from "./index";

const BASE = `${API}admin/services`;

export const getServices = () => {
  return http(BASE);
};

export const getServiceById = (id) => {
  return http(`${BASE}/${id}`);
};

export const createService = (service) => {
  return http(`${BASE}/new`, {
    method: "POST",
    body: JSON.stringify(service),
  });
};

export const updateService = (service) => {
  return http(`${BASE}/update/${service.id}`, {
    method: "PUT",
    body: JSON.stringify(service),
  });
};

export const deleteService = (id) => {
  return http(`${BASE}/${id}`, {
    method: "DELETE",
  });
};
