import { Input, LabelNote } from "../../../shared/ui";
import type { AddressErrors, AddressInput } from "../address.types";

type AddressFieldsProps = {
  value: AddressInput;
  onChange: (next: AddressInput) => void;
  errors?: AddressErrors;
  disabled?: boolean;
  /** Show the "Address name" field (Home, Office…). Only useful when the address gets saved. */
  withLabel?: boolean;
};

// The address inputs only, no <form> and no buttons, so the profile page and
// the checkout shipping step can each wrap them with their own actions.
// autoComplete lets the browser fill saved addresses in one click.
// Layout from design 5b: 2 columns on desktop, 1 on mobile.
function AddressFields({ value, onChange, errors = {}, disabled, withLabel = false }: AddressFieldsProps) {
  const field = (key: keyof AddressInput) => ({
    value: value[key] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, [key]: e.target.value }),
    error: errors[key] ?? undefined,
    disabled,
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {withLabel && (
        <Input
          label={<>Address name <LabelNote>optional</LabelNote></>}
          placeholder="e.g. Home, Office"
          className="sm:col-span-2"
          {...field("label")}
        />
      )}
      <Input label="Full name" autoComplete="name" className="sm:col-span-2" {...field("name")} />
      <Input label="Street and number" autoComplete="address-line1" className="sm:col-span-2" {...field("line1")} />
      <Input
        label={<>Apartment, floor, building <LabelNote>optional</LabelNote></>}
        autoComplete="address-line2"
        placeholder="e.g. ap. 5, et. 2"
        className="sm:col-span-2"
        {...field("line2")}
      />
      <Input label="City" autoComplete="address-level2" {...field("city")} />
      <Input label="Postal code" autoComplete="postal-code" inputMode="numeric" {...field("postalCode")} />
      <Input label="Country" autoComplete="country-name" className="sm:col-span-2" {...field("country")} />
    </div>
  );
}

export default AddressFields;
