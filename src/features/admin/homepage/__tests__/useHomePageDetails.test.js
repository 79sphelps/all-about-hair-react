import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHomePageDetails } from "../useHomePageDetails";
import { homepageApi } from "../api/homepage.api";

jest.mock("../api/homepage.api");

const createWrapper = () => {
  const queryClient = new QueryClient();

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("useHomePageDetails", () => {
  it("calls getHomepageDetails", async () => {
    homepageApi.getHomepageDetails.mockResolvedValue([
      { _id: "1", headline: "Test" },
    ]);

    const { result } = renderHook(() => useHomePageDetails(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });
});