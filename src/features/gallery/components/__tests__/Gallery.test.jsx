import { screen, fireEvent } from "@testing-library/react";
import Gallery from "../Gallery";
import { renderWithProviders } from "../../../../test-utils/render";
import { useGalleryImages } from "../../hooks/useGalleryImages";

jest.mock("../../hooks/useGalleryImages");

jest.mock("react-multi-carousel", () => {
  return ({ children }) => <div data-testid="carousel">{children}</div>;
});

describe("Gallery", () => {
  test("renders loading state", () => {
    useGalleryImages.mockReturnValue({
      isLoading: true,
    });

    renderWithProviders(<Gallery />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders error state", () => {
    useGalleryImages.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Failed to load gallery" },
    });

    renderWithProviders(<Gallery />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Failed to load gallery"
    );
  });

  test("renders gallery images", () => {
    useGalleryImages.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        { _id: "1", path: "test1.jpg" },
        { _id: "2", path: "test2.jpg" },
      ],
    });

    renderWithProviders(<Gallery />);

    // expect(screen.getByLabelText("View gallery image 1")).toBeInTheDocument();
    // expect(screen.getByLabelText("View gallery image 2")).toBeInTheDocument();

    // More resilient to DOM changes
    expect(screen.getByRole("button", { name: /view gallery image 1/i }));
    expect(screen.getByRole("button", { name: /view gallery image 2/i }));
  });

  test("opens modal when image clicked", () => {
    useGalleryImages.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ _id: "1", path: "test1.jpg" }],
    });

    renderWithProviders(<Gallery />);

    // const button = screen.getByLabelText("View gallery image 1");

    // More resilient to DOM changes
    const button = screen.getByRole("button", { name: /view gallery image 1/i });

    fireEvent.click(button);

    expect(screen.getByText("Gallery Image Preview")).toBeInTheDocument();
  });
});