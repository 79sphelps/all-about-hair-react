import {
  teamMemberSchema,
  teamMemberFormConfig,
} from "../teamMember.form";

describe("teamMemberSchema", () => {
  it("validates correct team member data", () => {
    const result = teamMemberSchema.safeParse({
      name: "Jane Doe",
      role: "Senior Stylist",
      photo: "/images/jane.jpg",
      bio: "Jane has over 10 years of experience in professional styling.",
    });

    expect(result.success).toBe(true);
  });

  it("fails validation when fields are too short", () => {
    const result = teamMemberSchema.safeParse({
      name: "J",
      role: "Dev",
      photo: "a",
      bio: "Too short",
    });

    expect(result.success).toBe(false);
  });
});

describe("teamMemberFormConfig", () => {
  it("contains expected default values", () => {
    expect(teamMemberFormConfig.defaultValues).toEqual({
      name: "",
      role: "",
      photo: "",
      bio: "",
    });
  });

  it("contains required fields", () => {
    const requiredFields = teamMemberFormConfig.fields.filter(
      (f) => f.required
    );

    expect(requiredFields.length).toBe(4);
  });

  it("returns remaining characters for bio dynamicDescription", () => {
    const bioField = teamMemberFormConfig.fields.find(
      (f) => f.name === "bio"
    );

    const message = bioField.dynamicDescription({
      bio: "short bio",
    });

    expect(message).toContain("characters remaining");
  });

  it("returns null when bio length requirement is satisfied", () => {
    const bioField = teamMemberFormConfig.fields.find(
      (f) => f.name === "bio"
    );

    const message = bioField.dynamicDescription({
      bio: "This bio is long enough to satisfy the validation rule.",
    });

    expect(message).toBeNull();
  });
});