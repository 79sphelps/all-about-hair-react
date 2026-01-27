import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

// Navbar Constants

// Banner Constants
export const BANNER_TITLE_TEXT = "All About Hair";
export const BANNER_HEADLINE_TEXT = "Hair Styling is a Must Try Fashion for";
export const BANNER_CONNECT_TEXT = "Let’s Connect";
export const BANNER_ROTATING_TEXT_ARY = [
  "Special Occasions",
  "All Occasions",
  "Defining Unique You!",
];

// Services Constants

// About Constants

export const ABOUT_QUALITIES_ARY = [
  "Great Customer Service",
  "Professional Cuts and Styles",
  "Flexible Scheduling",
];
export const ABOUT_MISSION_STATEMENT_TEXT =
  "Styling hair that makes a difference!";
export const ABOUT_MISSION_STATEMENT_SUBTEXT = "mission statement";

// Team Constants

// Contact Constants

export const CONTACT_FORM_SUCCESS_TEXT = "Thank you for your request";
export const CONTACT_FORM_SUCCESS_SUBTEXT =
  "An experienced team member will respond most likely in the next 24 to 48 hours.";

export const CONTACT_FORM_INPUTS_ARY = [
  {
    class: "firstName",
    id: "firstName",
    placeholder: "First Name",
    register_obj: {
      register_txt: "firstName",
      required: "You must enter a valid first name",
      minLength: {
        value: 2,
        message: "First name must be at least 2 characters",
      },
    },
    fieldError: "firstName",
  },
  {
    class: "lastName",
    id: "lastName",
    placeholder: "Last Name",
    register_obj: {
      register_txt: "lastName",
      required: "You must enter a valid last name",
      minLength: {
        value: 2,
        message: "Last name must be at least 2 characters",
      },
    },
    fieldError: "lastName",
  },
  {
    class: "email",
    id: "email",
    placeholder: "Email Address",
    register_obj: {
      register_txt: "email",
      required: "You must enter a valid email",
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Entered value does not match email format",
      },
    },
    fieldError: "email",
  },
  {
    class: "phone",
    id: "phone",
    placeholder: "Phone",
    register_obj: {
      register_txt: "phone",
      pattern: {
        value:
          /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
        message: "Entered value does not match phone format",
      },
    },
    fieldError: "phone",
  },
];

// Contact Info Constants

export const CONTACT_INFO_TITLE_TEXT = "Salon Information";
export const CONTACT_INFO_SUBTITLE_TEXT =
  "An experienced team member is almost always available during salon hours.";
export const CONTACT_INFO_TITLE2_TEXT = "Cuts";
export const CONTACT_INFO_TITLE2_SUBTEXT =
  "Whether you're in need of a clean-up, a new style, or a gender-affirming transformation, we've got you covered. Our experienced stylists are here for all your haircut needs.";
export const CONTACT_INFO_TITLE3_TEXT = "Coloring";
export const CONTACT_INFO_TITLE3_SUBTEXT =
  "From subtle to fantasy, our experienced stylists can give you the color you've been dreaming of. Need a little inspiration? Book a color consultation with a stylist and we will help you on your color journey.";
export const CONTACT_INFO_TITLE4_TEXT = "A-La-Carte";
export const CONTACT_INFO_TITLE4_SUBTEXT =
  "We offer a variety of a-la-carte services, from hair treatments and styling to beard care, we have all the cutting-edge services you need!";
export const CONTACT_INFO_VISIT_LOCATION_TEXT = "Visit Our Salon";
export const CONTACT_INFO_CALL_US_TEXT = "Call Us";
export const CONTACT_INFO_EMAIL_US_TEXT = "Email Us";
export const CONTACT_INFO_SALON_HOURS_TEXT = "Salon Hours";

// Gallery Constants

// Footer Constants

export const FOOTER_ABOUT_US_TEXT = "About Us";
export const FOOTER_ABOUT_US_SUBTEXT =
  "All About Hair is committed to creating a business that allows all staff to be paid a living wage and create careers, not just jobs. Read more about our B Corp Certification.";
export const FOOTER_COPYRIGHT_TEXT =
  "Copyright 2024 All About Hair; All rights reserved";
export const FOOTER_NEWSLETTER_TEXT = "Newsletter";
export const FOOTER_NEWSLETTER_SUBTEXT = "Stay up-to-date with our latest";
export const FOOTER_FOLLOW_US_TEXT = "Follow Us";
export const FOOTER_FOLLOW_US_SUBTEXT = "Let us be social";
export const FOOTER_SOCIALS_ARY = [
  {
    url: "#home",
    icon: <AiOutlineTwitter />,
  },
  {
    url: "#home",
    icon: <AiFillInstagram />,
  },
  {
    url: "#home",
    icon: <FaLinkedinIn />,
  },
];
