import type { Appearance, CssFontSource } from "@stripe/stripe-js";

// Stripe draws its fields inside an iframe (a separate page), so it can't read
// our CSS variables or Tailwind classes. We read the current token values here
// and hand them to Stripe's Appearance API as plain colors.
// Called again whenever the theme switches (see CheckoutForm).

const token = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();

export function getStripeAppearance(): Appearance {
  const dark = document.documentElement.classList.contains("dark");

  return {
    theme: dark ? "night" : "stripe", // base theme, then our values on top
    variables: {
      colorPrimary: token("accent"),
      colorBackground: token("surface"),
      colorText: token("fg"),
      colorTextSecondary: token("muted"),
      colorTextPlaceholder: token("muted"),
      colorDanger: token("danger"),
      fontFamily: '"Public Sans", ui-sans-serif, system-ui, sans-serif',
      fontSizeBase: "16px",
      spacingUnit: "4px",
      borderRadius: "6px",
      // Our focus ring (2px ring color, 2px gap), drawn the way Stripe allows
      focusBoxShadow: `0 0 0 2px ${token("bg")}, 0 0 0 4px ${token("ring")}`,
    },
    rules: {
      ".Input": { border: `1px solid ${token("input")}`, boxShadow: "none" },
      ".Input:hover": { borderColor: token("muted") },
      ".Input:focus": { borderColor: token("accent") },
      ".Input--invalid": { borderColor: token("danger") },
      ".Label": { fontWeight: "600", color: token("fg") },
      ".AccordionItem": { borderColor: token("border"), boxShadow: "none" },
    },
  };
}

// The iframe also can't see the fonts loaded in index.html
export const stripeFonts: CssFontSource[] = [
  { cssSrc: "https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&display=swap" },
];
