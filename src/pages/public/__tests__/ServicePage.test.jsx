import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServicePage from "../ServicePage";

jest.mock("../../../features/admin/services/hooks", () => ({
  useService: jest.fn(),
}));

jest.mock("../../../ui/feedback/LoadingSpinner", () => () => (
  <div>Loading...</div>
));

const { useService } = require("../../../features/admin/services/hooks");

describe("ServicePage", () => {
  const mockService = {
    title: "Hair Styling",
    description: "Professional styling",
    image: "assets/images/hair_extensions.webp",
    pricing: [
      {
        _id: "1",
        type: "Basic",
        price: "$50",
        description: "Basic styling",
      },
    ],
  };

  it("shows loading state", () => {
    useService.mockReturnValue({
      isLoading: true,
      data: undefined,
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: "/services/1", state: { id: "1" } }]}>
        <ServicePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders service details", async () => {
    useService.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockService,
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: "/services/1", state: { id: "1" } }]}>
        <ServicePage />
      </MemoryRouter>
    );

    expect(await screen.findByText("Hair Styling")).toBeInTheDocument();
    expect(screen.getByText("Basic")).toBeInTheDocument();
    expect(screen.getByText("$50")).toBeInTheDocument();
  });
});
