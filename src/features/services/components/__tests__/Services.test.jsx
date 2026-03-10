import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Services from "../Services";
import { renderWithProviders } from "../../../../test-utils/render";
import { useHomePageDetails } from "../../../admin/homepage/useHomePageDetails";
import { useServices } from "../../../admin/services/useServices";

jest.mock("../../../admin/homepage/useHomePageDetails");
jest.mock("../../../admin/services/useServices");

describe("Services", () => {
  test("renders loading state", () => {
    useHomePageDetails.mockReturnValue({ isLoading: true });
    useServices.mockReturnValue({ isLoading: true });


    renderWithProviders(
        <MemoryRouter>
        <Services />
        </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders homepage error", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Homepage failed" },
    });

    useServices.mockReturnValue({
      isLoading: false,
    });

    renderWithProviders(
        <MemoryRouter>
        <Services />
        </MemoryRouter>
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Homepage failed");
  });

  test("renders services error", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      data: [{ serviceDetailsHeadline: "Services", serviceDetailsSubMsg: "desc" }],
    });

    useServices.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Services failed" },
    });

    renderWithProviders(
        <MemoryRouter>
        <Services />
        </MemoryRouter>
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Services failed");
  });

  test("renders services list", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      data: [
        {
          serviceDetailsHeadline: "Our Services",
          serviceDetailsSubMsg: "Description",
        },
      ],
    });

    useServices.mockReturnValue({
      isLoading: false,
      data: [
        {
          _id: "1",
          title: "Hair Cut",
          description: "Professional haircut",
          image: "assets/img.jpg",
          pricing: [],
        },
      ],
    });

    renderWithProviders(
        <MemoryRouter>
        <Services />
        </MemoryRouter>
    );

    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("Hair Cut")).toBeInTheDocument();
    expect(screen.getByText("Professional haircut")).toBeInTheDocument();
  });
});