import { API } from "./index";

const GET_SERVICES_ENDPOINT = API + "admin/services";
const POST_SERVICE_ENDPOINT = API + `admin/services/new`;

class ServicesService {
    async getServiceDetails() {
        try {

            const response = await fetch(GET_SERVICES_ENDPOINT);
            if (!response.ok) throw new Error('The fetch for service details info failed for some reason.')
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async getServiceDetail(id) {
        try {

            const response = await fetch(API + `admin/services/${id}`);
            if (!response.ok) throw new Error('The fetch for service detail by ID failed for some reason.')
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async deleteService(id) {
        try {

            const response = await fetch(API + `admin/services/${id}`, {
                method: "DELETE",
                body: JSON.stringify(id),
              });
            if (!response.ok) throw new Error('The fetch for deleting service by ID failed for some reason.')
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async createService(service) {
        try {
            const response = await fetch(POST_SERVICE_ENDPOINT, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // "Authorization": `Bearer ${access_token}`
                },
                body: JSON.stringify(service),
              });
            if (!response.ok) throw new Error('The fetch for service creation failed for some reason.')
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async updateServiceDetails(data) {
        try {
            const response = await fetch(API + `admin/services/update/${data.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  // "Authorization": `Bearer ${access_token}`
                },
                body: JSON.stringify(data),
              });
            if (!response.ok) throw new Error('The fetch for service update by ID failed for some reason.')
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

export default new ServicesService();