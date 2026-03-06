import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "../ContactForm";
import { usePostGeneralRequest } from "../../hooks/usePostGeneralRequest";

jest.mock("../../hooks/usePostGeneralRequest");

describe("ContactForm", () => {
  it("renders form", () => {
    usePostGeneralRequest.mockReturnValue({
      postRequestMutation: { mutate: jest.fn() },
      isPending: false,
    });

    render(<ContactForm />);

    expect(
      screen.getByRole("heading", {
        name: /scheduling or questions/i,
      })
    ).toBeInTheDocument();
  });

  it("resets form when reset clicked", () => {
    usePostGeneralRequest.mockReturnValue({
      postRequestMutation: { mutate: jest.fn() },
      isPending: false,
    });

    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });
});