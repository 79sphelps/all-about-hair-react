import { API } from "./index";

const GET_ADMIN_CONTACT_ENDPOINT = API + "admin/contact";

class ContactService {
    async getContactInfo() {
        try {
            const response = await fetch(GET_ADMIN_CONTACT_ENDPOINT);
            if (!response.ok) throw new Error('The fetch for contact info failed for some reason.');
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

export default new ContactService();