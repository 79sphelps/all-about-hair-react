import { act } from "@testing-library/react";
import { renderHookWithProviders } from "../../../../test-utils/render";
import { useCreateService } from "../useCreateService";
import { servicesApi } from "../../../services/api/services.api";

jest.mock("../../../services/api/services.api");

describe("useCreateService", () => {
  it("calls createService mutation", async () => {
    servicesApi.createService.mockResolvedValue({});

    const { result } = renderHookWithProviders(() =>
      useCreateService()
    );

    await act(async () => {
      await result.current.mutateAsync({
        title: "Test Service",
      });
    });

    expect(servicesApi.createService).toHaveBeenCalledWith({
      title: "Test Service",
    });
  });
});