import { render, screen, fireEvent } from "@testing-library/react";
import ServicesCard from "../ServicesCard";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ServicesCard", () => {
  const props = {
    id: "123",
    title: "Hair Styling",
    description: "Professional styling",
    imgPath: "test.jpg",
    service: [],
  };

  test("renders service card", () => {
    render(
      <MemoryRouter>
        <ServicesCard {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText("Hair Styling")).toBeInTheDocument();
    expect(screen.getByText("Professional styling")).toBeInTheDocument();
  });

  test("navigates to service page on click", () => {
    render(
      <MemoryRouter>
        <ServicesCard {...props} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("View Details"));

    expect(mockNavigate).toHaveBeenCalledWith("/services/123", {
      state: { id: "123" },
    });
  });
});