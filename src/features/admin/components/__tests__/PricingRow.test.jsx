import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PricingRow from "../PricingRow";

/*
Because PricingRow has memoization logic, test:
- inputs render
- remove works
- change handler calls correct function
*/

jest.mock("../../../../ui/form/AccessibleFormField", () => (props) => {
  return (
    <input
      data-testid={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  );
});

describe("PricingRow", () => {
  const props = {
    item: {
      type: "Cut",
      price: "20",
      description: "Basic cut",
    },
    index: 0,
    arrayName: "pricing",
    errors: {},
    touched: {},
    handleNestedChange: jest.fn(),
    handleBlur: jest.fn(),
    removeArrayItem: jest.fn(),
  };

  it("renders pricing fields", () => {
    render(<PricingRow {...props} />);

    expect(screen.getByTestId("type")).toBeInTheDocument();
    expect(screen.getByTestId("price")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
  });

  it("calls removeArrayItem when remove clicked", async () => {
    render(<PricingRow {...props} />);

    const button = screen.getByText("Remove");

    await userEvent.click(button);

    expect(props.removeArrayItem).toHaveBeenCalledWith("pricing", 0);
  });
});