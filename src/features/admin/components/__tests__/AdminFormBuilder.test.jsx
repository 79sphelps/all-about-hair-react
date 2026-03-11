import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminFormBuilder from "../AdminFormBuilder";

/*
What to verify:

Behavior	                Test
renders normal fields	    text inputs render
renders textarea fields	    textarea exists
renders array fields	    PricingRow appears
add button works	        calls addArrayItem
remove button works	        calls removeArrayItem
error state displays	    error message passed
*/

jest.mock("../../../../ui/form/AccessibleFormField", () => (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        data-testid={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.error && <span>{props.error}</span>}
    </div>
  );
});

jest.mock("../PricingRow", () => (props) => (
  <div data-testid="pricing-row">
    <button
      onClick={() => props.removeArrayItem(props.arrayName, props.index)}
    >
      Remove
    </button>
  </div>
));

describe("AdminFormBuilder", () => {
  const mockForm = {
    values: {
      headline: "Test headline",
      pricing: [
        { type: "Cut", price: "20", description: "Basic cut" }
      ],
    },
    errors: {},
    touched: {},
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    handleNestedChange: jest.fn(),
    addArrayItem: jest.fn(),
    removeArrayItem: jest.fn(),
  };

  const fields = [
    {
      name: "headline",
      label: "Headline",
      type: "text",
      required: true,
    },
    {
      name: "pricing",
      label: "Pricing",
      type: "array",
      itemConfig: {
        defaultValues: {
          type: "",
          price: "",
          description: "",
        },
      },
    },
  ];

  it("renders normal fields", () => {
    render(<AdminFormBuilder form={mockForm} fields={fields} />);

    expect(screen.getByText("Headline")).toBeInTheDocument();
  });

  it("renders array rows", () => {
    render(<AdminFormBuilder form={mockForm} fields={fields} />);

    expect(screen.getByTestId("pricing-row")).toBeInTheDocument();
  });

  it("calls addArrayItem when add button clicked", async () => {
    render(<AdminFormBuilder form={mockForm} fields={fields} />);

    const button = screen.getByRole("button", { name: /add pricing/i });

    await userEvent.click(button);

    expect(mockForm.addArrayItem).toHaveBeenCalled();
  });

  it("calls removeArrayItem when remove clicked", async () => {
    render(<AdminFormBuilder form={mockForm} fields={fields} />);

    const button = screen.getByText("Remove");

    await userEvent.click(button);

    expect(mockForm.removeArrayItem).toHaveBeenCalled();
  });
});