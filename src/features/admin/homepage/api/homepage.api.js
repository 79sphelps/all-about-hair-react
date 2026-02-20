import { http } from "../../../../api/httpClient";

export const homepageApi = {
  getHomepageDetails: () => http("admin/homepage"),
  updateHomepageDetails: ({ id, ...payload }) =>
    http(`admin/homepage/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};
