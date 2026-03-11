import { waitFor } from "@testing-library/react";
import { renderHookWithProviders } from "../../../../test-utils/render";
import { useServices } from "../useServices";
import { servicesApi } from "../../../services/api/services.api";

jest.mock("../../../services/api/services.api");

describe("useServices", () => {
  it("calls getServices", async () => {
    servicesApi.getServices.mockResolvedValue([]);

    const { result } = renderHookWithProviders(() => useServices());

    await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
    })

    expect(servicesApi.getServices).toHaveBeenCalledTimes(1);
  });
});