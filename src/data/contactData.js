import { CONTACT, NAV_LINKS } from "./siteData.js";

// Contact section, form and footer copy (redesign markup, lines 552-637).

const [emailUser, emailDomain] = CONTACT.email.split("@");

// The address breaks after "@" on narrow screens (<wbr> between the parts)
export const EMAIL_PARTS = [`${emailUser}@`, emailDomain];

export const CONTACT_COPY = {
  eyebrow: "Contact",
  title: [{ text: "Get in " }, { text: "touch", em: true }],
  intro:
    "For all inquiries and collaborations, please complete the form next to this section. I’m available on weekdays from 9:00 AM to 8:00 PM.",
};

// .clist rows; a row without href is plain text
export const CONTACT_ROWS = [
  { label: "Email", parts: EMAIL_PARTS, href: `mailto:${CONTACT.email}`, icon: "ne" },
  { label: "Phone", parts: [CONTACT.phoneLabel], href: CONTACT.phoneHref, icon: "ne" },
  { label: "Instagram", parts: [CONTACT.instagram.handle], href: CONTACT.instagram.url, external: true, icon: "ne" },
  { label: "LinkedIn", parts: [CONTACT.linkedin.label], href: CONTACT.linkedin.url, external: true, icon: "ne" },
  { label: "Location", parts: [CONTACT.location], icon: "pin" },
];

// Form fields by name (validation order = key order)
export const FORM_FIELDS = {
  name: {
    label: "Name",
    type: "text",
    autoComplete: "name",
    placeholder: "Your name",
    error: "Please enter your name.",
  },
  email: {
    label: "Email",
    type: "email",
    autoComplete: "email",
    placeholder: "your@email.com",
    error: "Please enter a valid email address.",
  },
  phone: {
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+381 61 123 456",
    error: "Please enter a phone number.",
  },
  message: {
    label: "Message",
    multiline: true,
    rows: 4,
    placeholder: "How can I help you?",
    error: "Please write a short message.",
  },
};

export const FORM_COPY = {
  note: "All fields are required.",
  submit: "Send message",
  sending: "Sending...",
  errorMessage: `Your message could not be sent. Please try again or write to ${CONTACT.email}.`,
  doneEyebrow: "Message sent",
  doneThanks: "Thank you, ",
  doneFallbackName: "friend",
  doneText: "Your message has been received. I will get back to you as soon as possible.",
};

export const FOOTER_COPY = {
  eyebrow: "Have a project in mind?",
  navigateTitle: "Navigate",
  followTitle: "Follow",
  legalTitle: "Legal",
  developedBy: "Developed, Designed & Hosted by",
};

export const FOOTER_NAV = NAV_LINKS.filter((link) => link.id !== "home");

export const FOOTER_SOCIAL = [
  { label: "Instagram", url: CONTACT.instagram.url, icon: "ig" },
  { label: "LinkedIn", url: CONTACT.linkedin.url, icon: "in" },
];
