import { API } from "./index";

const GET_HOMEPAGE_INFO_ENDPOINT = API + "admin/homepage";

class HomepageService {
  async getHomepageDetails() {
    try {
      const response = await fetch(GET_HOMEPAGE_INFO_ENDPOINT);
      if (!response.ok)
        throw new Error("The fetch for homepage info failed for some reason.");
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred while fetching data:", error);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }

  async updateHomepageDetails(data) {
    // const access_token = await data.access_token;
    try {
      const response = await fetch(API + `admin/homepage/update/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error("The fetch for homepage info failed for some reason.");
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

export default new HomepageService();
