import { Input } from "../../../shared/ui";
import type { AddressErrors, AddressInput } from "../address.types";

type AddressFieldsProps = {
  value: AddressInput;
  onChange: (next: AddressInput) => void;
  errors?: AddressErrors;
  disabled?: boolean;
};

// The address inputs only, no <form> and no buttons, so the profile page and
// the checkout shipping step can each wrap them with their own actions.
// autoComplete lets the browser fill saved addresses in one click.
function AddressFields({ value, onChange, errors = {}, disabled }: AddressFieldsProps) {
  const field = (key: keyof AddressInput) => ({
    value: value[key] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...value, [key]: e.target.value }),
    error: errors[key],
    disabled,
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Input label="Full name" autoComplete="name" className="sm:col-span-2" {...field("name")} />
      <Input label="Street address" autoComplete="address-line1" className="sm:col-span-2" {...field("line1")} />
      <Input
        label="Apartment, floor (optional)"
        autoComplete="address-line2"
        className="sm:col-span-2"
        {...field("line2")}
      />
      <Input label="City" autoComplete="address-level2" {...field("city")} />
      <Input label="Postal code" autoComplete="postal-code" {...field("postalCode")} />
      <Input label="Country" autoComplete="country-name" className="sm:col-span-2" {...field("country")} />
    </div>
  );
}

export default AddressFields;
