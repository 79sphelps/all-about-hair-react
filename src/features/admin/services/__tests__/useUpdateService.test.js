import { act } from "@testing-library/react";
import { renderHookWithProviders } from "../../../../test-utils/render";
import { useUpdateService } from "../useUpdateService";
import { servicesApi } from "../../../services/api/services.api";

jest.mock("../../../services/api/services.api");

describe("useUpdateService", () => {
  it("calls updateService mutation", async () => {
    const updatedService = {
      _id: "123",
      title: "Updated Service",
    };

    servicesApi.updateService.mockResolvedValue(updatedService);

    const { result } = renderHookWithProviders(() =>
      useUpdateService()
    );

    await act(async () => {
      await result.current.mutateAsync(updatedService);
    });

    expect(servicesApi.updateService).toHaveBeenCalledWith(
      updatedService
    );
  });
});