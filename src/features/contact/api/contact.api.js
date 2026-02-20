import { http } from "../../../api/httpClient";

export const contactApi = {
  getContactInfo: () => http("admin/contact"),
};
