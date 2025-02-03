import { API } from "./index";

const POST_REQUESTS_ENDPOINT = API + `requests/new`;

class RequestsService {
    async postGeneralRequest(member) {
        try {
            const response = await fetch(POST_REQUESTS_ENDPOINT, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // "Authorization": `Bearer ${access_token}`
                },
                body: JSON.stringify(member),
              });
            if (!response.ok) throw new Error('The fetch for requests info failed for some reason.')
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

export default new RequestsService();