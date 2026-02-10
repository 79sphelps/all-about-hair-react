import { API } from "./index";

const POST_REQUESTS_ENDPOINT = API + "requests/new";

export async function postGeneralRequest(requestData) {
  const response = await fetch(POST_REQUESTS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${access_token}` // add if needed later
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Failed to post general request");
  }

  return response.json();
}
