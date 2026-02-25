import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PublicLayout from "../PublicLayout";

jest.mock("../../ui/navigation/PublicNavBar", () => () => (
  <div>NavBar</div>
));

jest.mock("../../features/footer/components/Footer", () => () => (
  <div>Footer</div>
));

describe("PublicLayout", () => {
  it("renders footer on non-services route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PublicLayout />
      </MemoryRouter>
    );

    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("does NOT render footer on services route", () => {
    render(
      <MemoryRouter initialEntries={["/services/1"]}>
        <PublicLayout />
      </MemoryRouter>
    );

    expect(screen.queryByText("Footer")).not.toBeInTheDocument();
  });
});
