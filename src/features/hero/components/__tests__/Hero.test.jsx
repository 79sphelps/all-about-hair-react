import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "../Hero";
import { useHomePageDetails } from "../../../admin/homepage/useHomePageDetails";

jest.mock("react-on-screen", () => {
  return ({ children }) => children({ isVisible: true });
});

jest.mock("../../../admin/homepage/useHomePageDetails");

describe("Hero", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", async () => {
    useHomePageDetails.mockReturnValue({
      isLoading: true,
    });

    render(<Hero />);
    // expect(screen.getByRole("status")).toBeInTheDocument();
    expect(await screen.findByText("Loading…")).toBeInTheDocument();
  });

  it("renders error state", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      isError: true,
      data: "...",
      error: { message: "Failed" },
    });

    render(<Hero />);
    expect(screen.getByRole("alert")).toHaveTextContent("Failed");
  });

  it("renders banner content when loaded", async () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ headlineSubMsg: "Custom headline message" }],
    });

    render(<Hero />);

    expect(await screen.findByText("Custom headline message")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /scroll to contact section/i })
    ).toBeInTheDocument();

    expect(
      screen.getByAltText(/illustration representing our services/i)
    ).toBeInTheDocument();
  });

  it("scrolls to contact section on button click", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ headlineSubMsg: "Hello" }],
    });

    const scrollIntoViewMock = jest.fn();
    document.getElementById = jest.fn(() => ({
      scrollIntoView: scrollIntoViewMock,
    }));

    render(<Hero />);

    fireEvent.click(
      screen.getByRole("button", { name: /scroll to contact section/i })
    );

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});