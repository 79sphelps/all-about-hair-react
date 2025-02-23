import { API } from "./index";

const GET_TEAM_INFO_ENDPOINT = API + "admin/personel";
const POST_TEAM_INFO_ENDPOINT = API + "admin/personel/new";

class TeamService {
    async getTeamDetails() {
        try {
            const response = await fetch(GET_TEAM_INFO_ENDPOINT);
            if (!response.ok) throw new Error('The fetch for team info failed for some reason.');
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async getTeamMemberDetail(id) {
        try {
            const response = await fetch(API + `admin/personel/${id}`);
            if (!response.ok) throw new Error('The fetch for team member info by ID failed for some reason.');
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async deleteTeamMember(id) {
        try {
            const response =  await fetch(API + `admin/personel/${id}`, {
                method: "DELETE",
                body: JSON.stringify(id),
              });
            if (!response.ok) throw new Error('The fetch for deleting team member by ID failed for some reason.');
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async createTeamMember(member) {
        try {
            const response = await fetch(POST_TEAM_INFO_ENDPOINT, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // "Authorization": `Bearer ${access_token}`
                },
                body: JSON.stringify(member),
              });
            if (!response.ok) throw new Error('The fetch for team member creation failed for some reason.');
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async updateTeamMemberDetails(data) {
        try {
            const response = await fetch(API + `admin/personel/update/${data.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  // "Authorization": `Bearer ${access_token}`
                },
                body: JSON.stringify(data),
              });
            if (!response.ok) throw new Error('The fetch for team member update by ID failed for some reason.');
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

export default new TeamService();