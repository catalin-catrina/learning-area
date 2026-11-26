import type { ShippingAddress } from "../orders/order.types";

// The editable fields are the same as an order's shipping address.
export type AddressInput = ShippingAddress;

// A saved address, as the API returns it.
export type Address = Omit<ShippingAddress, "line2"> & {
  id: number;
  line2: string | null;
  isDefault: boolean;
  createdAt: string;
  userId: number;
};

export type AddressErrors = Partial<Record<keyof AddressInput, string>>;

export const emptyAddress: AddressInput = {
  label: "",
  name: "",
  line1: "",
  line2: "",
  city: "",
  postalCode: "",
  country: "",
};

/** Same required fields as the backend validator, checked before sending. */
export function validateAddress(a: AddressInput): AddressErrors {
  const errors: AddressErrors = {};
  if (!a.name.trim()) errors.name = "Enter the recipient's name";
  if (!a.line1.trim()) errors.line1 = "Enter a street address";
  if (!a.city.trim()) errors.city = "Enter a city";
  if (!a.postalCode.trim()) errors.postalCode = "Enter a postal code";
  if (!a.country.trim()) errors.country = "Enter a country";
  return errors;
}

/** Saved address → form value (null line2 → ""). */
export function toInput(a: Address): AddressInput {
  return {
    label: a.label ?? "",
    name: a.name,
    line1: a.line1,
    line2: a.line2 ?? "",
    city: a.city,
    postalCode: a.postalCode,
    country: a.country,
  };
}
