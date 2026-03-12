import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test-utils/render";

import HomePageDetailsPage from "../HomePageDetailsPage";

import {
  useHomePageDetails,
  useUpdateHomePageDetails,
} from "../../../features/admin/homepage/hooks";

jest.mock("../../../features/admin/homepage/hooks");

describe("HomePageDetailsPage integration", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // useHomePageDetails.mockReturnValue({
    //   data: [
    //     {
    //       _id: "1",
    //       title: "Welcome",
    //       subtitle: "Luxury Salon",
    //     },
    //   ],
    //   isLoading: false,
    //   isError: false,
    // });
    useHomePageDetails.mockReturnValue({
    data: [
        {
        _id: "1",
        headline: "Welcome",
        headlineSubMsg: "Luxury salon services",
        servicesHeadline: "Our Services",
        servicesSubMsg: "Hair styling and more",
        aboutHeadline: "About Us",
        aboutSubMsg: "Professional team",
        aboutImage: "about.jpg",
        aboutVideoLink: "https://youtube.com/test",
        stylistsHeadline: "Our Stylists",
        stylistsSubMsg: "Meet our team",
        serviceDetailsHeadline: "Service Details",
        serviceDetailsSubMsg: "Detailed services",
        contactHeadline: "Contact Us",
        contactSubMsg: "Book today",
        },
    ],
    isLoading: false,
    isError: false,
    });

    useUpdateHomePageDetails.mockReturnValue({
      mutate: mockMutate,
    });
  });

  it("renders homepage details form", async () => {
    renderWithProviders(<HomePageDetailsPage />);

    expect(
      await screen.findByRole("heading", { name: /update homepage details/i })
    ).toBeInTheDocument();
  });

  it("submits homepage update", async () => {
    const user = userEvent.setup();

    renderWithProviders(<HomePageDetailsPage />);

    const titleInput = await screen.findByDisplayValue("Welcome");

    await user.clear(titleInput);
    await user.type(titleInput, "Updated Title");

    await user.click(
      screen.getByRole("button", { name: /make changes/i })
    );

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it("shows success message after update", async () => {
    const user = userEvent.setup();

    useUpdateHomePageDetails.mockReturnValue({
      mutate: (_, { onSuccess }) => onSuccess(),
    });

    renderWithProviders(<HomePageDetailsPage />);

    await user.click(
      screen.getByRole("button", { name: /make changes/i })
    );

    expect(
      await screen.findByText(/homepage details successfully updated/i)
    ).toBeInTheDocument();
  });
});