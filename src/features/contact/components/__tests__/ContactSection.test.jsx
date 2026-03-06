import { render, screen } from "@testing-library/react";
import ContactSection from "../ContactSection";
import { useContactInfo } from "../../hooks/useContactInfo";
import { renderWithProviders } from "../../../../test-utils/render";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../../hooks/useContactInfo");

// function renderWithQueryClient(ui) {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: { retry: false },
//       mutations: { retry: false },
//     },
//   });

//   return render(
//     <QueryClientProvider client={queryClient}>
//       {ui}
//     </QueryClientProvider>
//   );
// }

describe("ContactSection", () => {
  it("renders loading", async () => {
    useContactInfo.mockReturnValue({ isLoading: true });

    renderWithProviders(<ContactSection />);

    // expect(screen.getByRole("status")).toBeInTheDocument();
    expect(await screen.findByText("Loading…")).toBeInTheDocument();
  });

  it("renders error", () => {
    useContactInfo.mockReturnValue({
      isError: true,
      error: { message: "Failed" },
    });

    renderWithProviders(<ContactSection />);

    expect(screen.getByRole("alert")).toHaveTextContent("Failed");
  });

  it("renders contact info", () => {
    useContactInfo.mockReturnValue({
      isLoading: false,
      data: [
        {
          location: "123 Main St",
          phone: "1234567890",
          email: "test@test.com",
          hours: ["Mon 9-5", "Tue 9-5"],
        },
      ],
    });

    renderWithProviders(<ContactSection />);

    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
  });
});