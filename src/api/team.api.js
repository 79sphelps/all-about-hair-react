import { http } from "./httpClient";
import { API } from "./index";

const BASE = `${API}admin/personel`;

export const getTeamMembers = () => {
  return http(BASE);
};

export const getTeamMemberById = (id) => {
  return http(`${BASE}/${id}`);
};

export const createTeamMember = (member) => {
  return http(`${BASE}/new`, {
    method: "POST",
    body: JSON.stringify(member),
  });
};

export const updateTeamMember = (member) => {
  return http(`${BASE}/update/${member.id}`, {
    method: "PUT",
    body: JSON.stringify(member),
  });
};

export const deleteTeamMember = (id) => {
  return http(`${BASE}/${id}`, {
    method: "DELETE",
  });
};
