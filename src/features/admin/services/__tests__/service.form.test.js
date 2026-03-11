import {
  pricingSchema,
  serviceSchema,
  pricingFormConfig,
  serviceFormConfig,
} from "../service.form";

describe("pricingSchema", () => {
  it("validates correct pricing data", () => {
    const result = pricingSchema.safeParse({
      type: "Basic Wash",
      price: "$10",
      description: "Basic exterior wash service",
    });

    expect(result.success).toBe(true);
  });

  it("fails when fields are too short", () => {
    const result = pricingSchema.safeParse({
      type: "A",
      price: "1",
      description: "short",
    });

    expect(result.success).toBe(false);
  });
});

describe("serviceSchema", () => {
  it("validates correct service data", () => {
    const result = serviceSchema.safeParse({
      title: "Full Detail",
      image: "/images/detail.jpg",
      description: "Complete interior and exterior detail service",
      pricing: [
        {
          type: "Sedan",
          price: "$120",
          description: "Sedan full detail package",
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("defaults pricing to empty array", () => {
    const result = serviceSchema.parse({
      title: "Full Detail",
      image: "/images/detail.jpg",
      description: "Complete interior and exterior detail service",
    });

    expect(result.pricing).toEqual([]);
  });

  it("fails validation when title is too short", () => {
    const result = serviceSchema.safeParse({
      title: "A",
      image: "/image.jpg",
      description: "Valid description here",
    });

    expect(result.success).toBe(false);
  });
});

describe("pricingFormConfig", () => {
  it("contains expected default values", () => {
    expect(pricingFormConfig.defaultValues).toEqual({
      type: "",
      price: "",
      description: "",
    });
  });

  it("defines required fields", () => {
    const requiredFields = pricingFormConfig.fields.filter(
      (f) => f.required
    );

    expect(requiredFields.length).toBe(3);
  });
});

describe("serviceFormConfig", () => {
  it("contains correct default values", () => {
    expect(serviceFormConfig.defaultValues).toEqual({
      title: "",
      image: "",
      description: "",
      pricing: [],
    });
  });

  it("contains pricing array field", () => {
    const pricingField = serviceFormConfig.fields.find(
      (f) => f.name === "pricing"
    );

    expect(pricingField.type).toBe("array");
    expect(pricingField.itemConfig).toBeDefined();
  });
});