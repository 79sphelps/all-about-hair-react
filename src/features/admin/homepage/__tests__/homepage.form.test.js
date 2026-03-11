import { homepageSchema, homepageFormConfig } from "../homepage.form";

describe("homepageSchema", () => {
  const validData = {
    headline: "Welcome",
    headlineSubMsg: "This is a valid headline message",
    servicesHeadline: "Services",
    servicesSubMsg: "We offer amazing services",
    aboutHeadline: "About Us",
    aboutSubMsg: "Learn more about our salon and team",
    aboutImage: "/images/about.jpg",
    aboutVideoLink: "https://youtube.com/video",
    stylistsHeadline: "Stylists",
    stylistsSubMsg: "Meet our talented stylists",
    serviceDetailsHeadline: "Details",
    serviceDetailsSubMsg: "More information about services",
    contactHeadline: "Contact",
    contactSubMsg: "Reach out anytime",
  };

  it("validates correct data", () => {
    const result = homepageSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  it("fails when headline too short", () => {
    const result = homepageSchema.safeParse({
      ...validData,
      headline: "A",
    });

    expect(result.success).toBe(false);
  });

  it("fails when aboutVideoLink is not a valid URL", () => {
    const result = homepageSchema.safeParse({
      ...validData,
      aboutVideoLink: "not-a-url",
    });

    expect(result.success).toBe(false);
  });

  it("fails when required fields missing", () => {
    const result = homepageSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});

describe("homepageFormConfig", () => {
  it("contains expected defaultValues", () => {
    expect(homepageFormConfig.defaultValues).toHaveProperty("headline");
    expect(homepageFormConfig.defaultValues).toHaveProperty("contactSubMsg");
  });

  it("defines fields configuration", () => {
    expect(homepageFormConfig.fields.length).toBeGreaterThan(5);

    const headlineField = homepageFormConfig.fields.find(
      (f) => f.name === "headline"
    );

    expect(headlineField.label).toBe("Headline");
  });
});