import { API } from "./index";

const GET_ADMIN_CONTACT_ENDPOINT = API + "admin/contact";

class ContactService {
  async getContactInfo() {
    try {
      const response = await fetch(GET_ADMIN_CONTACT_ENDPOINT);
      if (!response.ok) {
        throw new Error("The fetch for contact info failed for some reason.");
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred while fetching data:", error);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }
}

export default new ContactService();
