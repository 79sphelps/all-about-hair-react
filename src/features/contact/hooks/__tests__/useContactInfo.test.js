import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContactInfo } from "../useContactInfo";
import { contactApi } from "../../api/contact.api";

jest.mock("../../api/contact.api");

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

test("fetches contact info", async () => {
    contactApi.getContactInfo.mockResolvedValue([
       { email: "test@test.com" },
    ]);

  const { result } = renderHook(() => useContactInfo(), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual([{ email: "test@test.com" }]);
});