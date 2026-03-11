import { waitFor } from "@testing-library/react";
import { renderHookWithProviders } from "../../../../test-utils/render";
import { useService } from "../useService";
import { servicesApi } from "../../../services/api/services.api";

jest.mock("../../../services/api/services.api");

describe("useService", () => {
  it("does not fetch when serviceId is missing", () => {
    const { result } = renderHookWithProviders(() =>
      useService(null)
    );

    expect(result.current.fetchStatus).toBe("idle");
  });

  it("fetches service when id exists", async () => {
    servicesApi.getServiceById.mockResolvedValue({
      _id: "1",
      title: "Test Service",
    });

    const { result } = renderHookWithProviders(() =>
      useService("1")
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(servicesApi.getServiceById).toHaveBeenCalledWith("1");
  });
});