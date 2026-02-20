import { http } from "../../../api/httpClient";

export const requestsApi = {
  postGeneralRequest: (requestData) =>
    http("requests/new", {
      method: "POST",
      body: JSON.stringify(requestData),
    }),
};
