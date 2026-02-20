import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              Pricing Schema                                */
/* -------------------------------------------------------------------------- */

export const pricingSchema = z.object({
  type: z.string().min(5, "Type must be at least 5 characters."),
  price: z.string().min(3, "Price must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
});

/* -------------------------------------------------------------------------- */
/*                              Service Schema                                */
/* -------------------------------------------------------------------------- */

export const serviceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  image: z.string().min(5, "Image path must be at least 5 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  pricing: z.array(pricingSchema).default([]),
});

/* -------------------------------------------------------------------------- */
/*                         Pricing Form Config                                */
/* -------------------------------------------------------------------------- */

export const pricingFormConfig = {
  schema: pricingSchema,
  defaultValues: {
    type: "",
    price: "",
    description: "",
  },
  fields: [
    {
      name: "type",
      label: "Type",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                         Service Form Config                                */
/* -------------------------------------------------------------------------- */

export const serviceFormConfig = {
  schema: serviceSchema,
  defaultValues: {
    title: "",
    image: "",
    description: "",
    pricing: [],
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "image",
      label: "Image Path",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      rows: 6,
      required: true,
    },
  ],
};
