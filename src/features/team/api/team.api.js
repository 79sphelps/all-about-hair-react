import { http } from "../../../api/httpClient";

export const teamApi = {
  getTeamMembers: () => http("admin/personel"),
  getTeamMember: (id) => http(`admin/personel/${id}`),
  createTeamMember: (member) =>
    http("admin/personel/new", {
      method: "POST",
      body: JSON.stringify(member),
    }),
  updateTeamMember: (member) =>
    http(`admin/personel/update/${member.id}`, {
      method: "PUT",
      body: JSON.stringify(member),
    }),
  deleteTeamMember: (id) => http(`admin/personel/${id}`, { method: "DELETE" }),
};
