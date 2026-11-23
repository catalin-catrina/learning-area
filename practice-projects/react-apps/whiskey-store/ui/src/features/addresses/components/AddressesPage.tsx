import { useState } from "react";
import { Button, Checkbox, Spinner } from "../../../shared/ui";
import { useAddresses, useAddressMutations } from "../hooks/useAddresses";
import {
  emptyAddress,
  toInput,
  validateAddress,
  type Address,
  type AddressErrors,
  type AddressInput,
} from "../address.types";
import AddressFields from "./AddressFields";
import AddressSummary from "./AddressSummary";

// Profile → Addresses: see all saved addresses, add, edit, delete, pick the default.
// Layout is intentionally plain: it gets its real design in the pages phase.

// What's open: nothing, the "add" form, or the edit form of one address
type Editing = null | "new" | number;

function AddressesPage() {
  const { data: addresses, isPending, isError } = useAddresses();
  const { create, update, setDefault, remove } = useAddressMutations();
  const [editing, setEditing] = useState<Editing>(null);

  if (isPending) return <Spinner />;
  if (isError) return <p className="text-danger">Could not load your addresses.</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl">Addresses</h2>
        {editing !== "new" && (
          <Button variant="secondary" size="sm" onClick={() => setEditing("new")}>
            Add address
          </Button>
        )}
      </div>

      {editing === "new" && (
        <AddressForm
          initial={emptyAddress}
          showDefaultOption={addresses.length > 0}
          submitLabel="Save address"
          pending={create.isPending}
          onCancel={() => setEditing(null)}
          onSubmit={(input, isDefault) =>
            create.mutate({ ...input, isDefault }, { onSuccess: () => setEditing(null) })
          }
        />
      )}

      {addresses.length === 0 && editing !== "new" && (
        <p className="text-muted">
          No saved addresses yet. Add one here, or save one during checkout.
        </p>
      )}

      <ul className="flex flex-col gap-4">
        {addresses.map((address: Address) =>
          editing === address.id ? (
            <li key={address.id}>
              <AddressForm
                initial={toInput(address)}
                submitLabel="Save changes"
                pending={update.isPending}
                onCancel={() => setEditing(null)}
                onSubmit={(input) =>
                  update.mutate(
                    { id: address.id, input },
                    { onSuccess: () => setEditing(null) },
                  )
                }
              />
            </li>
          ) : (
            <li
              key={address.id}
              className="flex flex-col gap-4 rounded-md border border-border bg-surface p-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex flex-col gap-2">
                {address.isDefault && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    Default
                  </span>
                )}
                <AddressSummary address={address} />
              </div>

              <div className="flex flex-wrap gap-2">
                {!address.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    loading={setDefault.isPending && setDefault.variables === address.id}
                    onClick={() => setDefault.mutate(address.id)}
                  >
                    Set as default
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setEditing(address.id)}>
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  loading={remove.isPending && remove.variables === address.id}
                  onClick={() => {
                    if (window.confirm("Delete this address?")) remove.mutate(address.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

type AddressFormProps = {
  initial: AddressInput;
  submitLabel: string;
  pending: boolean;
  /** Show "make this my default" (only when adding, and the user has other addresses). */
  showDefaultOption?: boolean;
  onSubmit: (input: AddressInput, isDefault: boolean) => void;
  onCancel: () => void;
};

function AddressForm({
  initial,
  submitLabel,
  pending,
  showDefaultOption = false,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const [value, setValue] = useState(initial);
  const [errors, setErrors] = useState<AddressErrors>({});
  const [makeDefault, setMakeDefault] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateAddress(value);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(value, makeDefault);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-md border border-border bg-surface p-4"
    >
      <AddressFields value={value} onChange={setValue} errors={errors} disabled={pending} />
      {showDefaultOption && (
        <Checkbox
          label="Make this my default address"
          checked={makeDefault}
          onChange={(e) => setMakeDefault(e.target.checked)}
        />
      )}
      <div className="flex gap-2">
        <Button type="submit" loading={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Button variant="ghost" onClick={onCancel} disabled={pending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default AddressesPage;
