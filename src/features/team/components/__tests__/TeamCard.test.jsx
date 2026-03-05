import { render, screen, fireEvent } from "@testing-library/react";
import TeamCard from "../TeamCard";

describe("TeamCard", () => {
  const props = {
    imgPath: "test.jpg",
    title: "Jane Doe",
    description: "Hair-Stylist",
    bio: "Full biography text",
  };

  it("renders basic info", () => {
    render(<TeamCard {...props} />);

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Hair-Stylist")).toBeInTheDocument();
  });

  it("opens modal when clicking button", () => {
    render(<TeamCard {...props} />);

    fireEvent.click(
      screen.getByRole("button", { name: /view full profile/i })
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Full biography text")).toBeInTheDocument();
  });

//   it("closes modal", async () => {
//     render(<TeamCard {...props} />);

//     fireEvent.click(
//       screen.getByRole("button", { name: /view full profile/i })
//     );

//     fireEvent.click(screen.getByRole("button", { name: /close/i }));

//     expect(await screen.queryByRole("dialog")).not.toBeInTheDocument();
//   });
});