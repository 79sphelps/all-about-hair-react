import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "../ContactForm";
import { usePostGeneralRequest } from "../../hooks/usePostGeneralRequest";
import userEvent from "@testing-library/user-event";

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

  it("resets form when reset clicked", async () => {
    usePostGeneralRequest.mockReturnValue({
      postRequestMutation: { mutate: jest.fn() },
      isPending: false,
    });

    render(<ContactForm />);

    //   fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    // Better:
    // userEvent automatically wraps events in act().
    // --> So, React state updates complete before assertions run. 
    const resetButton = screen.getByRole("button", { name: /reset/i });
    await userEvent.click(resetButton);

    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });
});