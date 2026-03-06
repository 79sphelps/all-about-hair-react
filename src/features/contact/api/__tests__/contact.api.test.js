import { contactApi } from "../contact.api";
import { http } from "../../../../api/httpClient";

jest.mock("../../../../api/httpClient");

describe("contactApi", () => {
  it("fetches contact info", async () => {
    const mockData = [{ email: "test@test.com" }];

    http.mockResolvedValue(mockData);

    const result = await contactApi.getContactInfo();

    expect(http).toHaveBeenCalledWith("admin/contact");

    expect(result).toEqual(mockData);
  });
});