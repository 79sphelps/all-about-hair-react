import { requestsApi } from "../requests.api";
import { http } from "../../../../api/httpClient";

jest.mock("../../../../api/httpClient");

describe("requestsApi", () => {
  it("posts general request", async () => {
    const mockResponse = { success: true };

    http.mockResolvedValue(mockResponse);

    const request = { name: "John" };

    const result = await requestsApi.postGeneralRequest(request);

    expect(http).toHaveBeenCalledWith(
      "requests/new",
      {
        method: "POST",
        body: JSON.stringify(request),
      }
    );

    expect(result).toEqual(mockResponse);
  });
});