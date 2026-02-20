import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.string().min(5, "Role must be at least 5 characters."),
  photo: z.string().min(10, "Image path must be at least 10 characters."),
  bio: z.string().min(25, "Bio must be at least 25 characters."),
});

export const teamMemberFormConfig = {
  schema: teamMemberSchema,
  defaultValues: {
    name: "",
    role: "",
    photo: "",
    bio: "",
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      label: "Role",
      type: "text",
      required: true,
    },
    {
      name: "photo",
      label: "Image Path",
      type: "text",
      required: true,
    },
    {
      name: "bio",
      label: "Bio",
      type: "textarea",
      rows: 6,
      required: true,
      dynamicDescription: (values) =>
        values.bio.length < 25
          ? `${25 - values.bio.length} characters remaining`
          : null,
    },
  ],
};
