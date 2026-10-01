// Contact form rules (same as the redesign): value -> valid?
export const CONTACT_RULES = {
  name: (value) => value.trim().length >= 2,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
  phone: (value) => /^[+()\d\s/-]{6,}$/.test(value.trim()) && (value.match(/\d/g) || []).length >= 6,
  message: (value) => value.trim().length >= 5,
};

export const CONTACT_FIELD_NAMES = Object.keys(CONTACT_RULES);

export function isFieldValid(name, value) {
  return CONTACT_RULES[name](value ?? "");
}
