import { http } from "../../../api/httpClient";

export const servicesApi = {
  getServices: () => http("admin/services"),
  getServiceById: (id) => http(`admin/services/${id}`),
  createService: (service) =>
    http(`admin/services/new`, {
      method: "POST",
      body: JSON.stringify(service),
    }),
  updateService: (service) =>
    http(`admin/services/update/${service.id}`, {
      method: "PUT",
      body: JSON.stringify(service),
    }),
  deleteService: (id) =>
    http(`admin/services/${id}`, {
      method: "DELETE",
    }),
};
