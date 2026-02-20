import { z } from "zod";

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const homepageSchema = z.object({
  headline: z.string().min(3, "Headline must be at least 3 characters."),
  headlineSubMsg: z.string().min(10, "Must be at least 10 characters."),

  servicesHeadline: z.string().min(3, "Headline must be at least 3 characters."),
  servicesSubMsg: z.string().min(10, "Must be at least 10 characters."),

  aboutHeadline: z.string().min(3, "Headline must be at least 3 characters."),
  aboutSubMsg: z.string().min(10, "Must be at least 10 characters."),
  aboutImage: z
    .string()
    .min(6, "Enter a valid image path.")
    .refine((v) => v.includes("/"), "Enter a valid image path."),

  aboutVideoLink: z
    .string()
    .refine(isValidUrl, "Enter a valid URL."),

  stylistsHeadline: z.string().min(3, "Headline must be at least 3 characters."),
  stylistsSubMsg: z.string().min(10, "Must be at least 10 characters."),

  serviceDetailsHeadline: z
    .string()
    .min(3, "Headline must be at least 3 characters."),
  serviceDetailsSubMsg: z
    .string()
    .min(10, "Must be at least 10 characters."),

  contactHeadline: z.string().min(3, "Headline must be at least 3 characters."),
  contactSubMsg: z.string().min(10, "Must be at least 10 characters."),
});

export const homepageFormConfig = {
  schema: homepageSchema,

  defaultValues: {
    headline: "",
    headlineSubMsg: "",
    servicesHeadline: "",
    servicesSubMsg: "",
    aboutHeadline: "",
    aboutSubMsg: "",
    aboutImage: "",
    aboutVideoLink: "",
    stylistsHeadline: "",
    stylistsSubMsg: "",
    serviceDetailsHeadline: "",
    serviceDetailsSubMsg: "",
    contactHeadline: "",
    contactSubMsg: "",
  },

  fields: [
    { name: "headline", label: "Headline", type: "text", required: true },
    {
      name: "headlineSubMsg",
      label: "Headline Sub Message",
      type: "textarea",
      rows: 3,
      required: true,
    },

    { name: "servicesHeadline", label: "Services Headline", type: "text", required: true },
    {
      name: "servicesSubMsg",
      label: "Services Sub Message",
      type: "textarea",
      rows: 3,
      required: true,
    },

    { name: "aboutHeadline", label: "About Section Headline", type: "text", required: true },
    {
      name: "aboutSubMsg",
      label: "About Section Sub Message",
      type: "textarea",
      rows: 3,
      required: true,
    },
    { name: "aboutImage", label: "About Image Path", type: "text", required: true },
    { name: "aboutVideoLink", label: "About Video URL", type: "text", required: true },

    { name: "stylistsHeadline", label: "Stylists Headline", type: "text", required: true },
    {
      name: "stylistsSubMsg",
      label: "Stylists Sub Message",
      type: "textarea",
      rows: 3,
      required: true,
    },

    {
      name: "serviceDetailsHeadline",
      label: "Service Details Headline",
      type: "text",
      required: true,
    },
    {
      name: "serviceDetailsSubMsg",
      label: "Service Details Sub Message",
      type: "textarea",
      rows: 3,
      required: true,
    },

    { name: "contactHeadline", label: "Contact Headline", type: "text", required: true },
    {
      name: "contactSubMsg",
      label: "Contact Sub Message",
      type: "textarea",
      rows: 3,
      required: true,
    },
  ],
};
