import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePostGeneralRequest } from "../usePostGeneralRequest";
import { requestsApi } from "../../api/requests.api";

jest.mock("../../api/requests.api");

const createWrapper = () => {
  const queryClient = new QueryClient();

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("usePostGeneralRequest", () => {
  it("posts request successfully", async () => {
    requestsApi.postGeneralRequest.mockResolvedValue({ success: true });

    const { result } = renderHook(() => usePostGeneralRequest(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync({ name: "John" });
    });

    expect(requestsApi.postGeneralRequest).toHaveBeenCalled();
  });
});