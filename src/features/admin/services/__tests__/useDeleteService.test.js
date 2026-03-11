import { act } from "@testing-library/react";
import { renderHookWithProviders } from "../../../../test-utils/render";
import { useDeleteService } from "../useDeleteService";
import { servicesApi } from "../../../services/api/services.api";

jest.mock("../../../services/api/services.api");

describe("useDeleteService", () => {
  it("calls deleteService mutation", async () => {
    servicesApi.deleteService.mockResolvedValue({});

    const { result } = renderHookWithProviders(() =>
      useDeleteService()
    );

    await act(async () => {
      await result.current.mutateAsync("123");
    });

    expect(servicesApi.deleteService).toHaveBeenCalledWith("123");
  });
});