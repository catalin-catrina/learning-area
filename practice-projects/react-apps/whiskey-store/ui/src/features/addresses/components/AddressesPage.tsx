import { useState } from "react";
import { cn } from "cn";
import { Badge, Button, Checkbox, MapPinIcon, PencilIcon, PlusIcon, Skeleton, TrashIcon, focusRing } from "../../../shared/ui";
import EmptyState from "../../../shared/components/EmptyState";
import { useAuth } from "../../auth/hooks/useAuth";
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

// Design 8g: saved addresses as cards, plus an "Add a new address" tile.

// What's open: nothing, the "add" form, or the edit form of one address
type Editing = null | "new" | number;

function AddressesPage() {
  const { user } = useAuth();
  const { data: addresses, isPending, isError } = useAddresses();
  const { create, update, setDefault, remove } = useAddressMutations();
  const [editing, setEditing] = useState<Editing>(null);

  if (isPending) {
    return (
      <div className="grid gap-6 sm:grid-cols-2" aria-busy="true">
        <Skeleton className="h-56 rounded-lg" />
        <Skeleton className="h-56 rounded-lg" />
      </div>
    );
  }
  if (isError) return <p className="text-danger">Could not load your addresses.</p>;

  return (
    <div className="flex flex-col gap-6">
      {editing === "new" && (
        <AddressForm
          title="New address"
          initial={emptyAddress}
          showDefaultOption={addresses.length > 0}
          submitLabel="Save address"
          pending={create.isPending}
          onCancel={() => setEditing(null)}
          onSubmit={(input, isDefault) => create.mutate({ ...input, isDefault }, { onSuccess: () => setEditing(null) })}
        />
      )}

      {addresses.length === 0 && editing !== "new" ? (
        <EmptyState
          icon={<MapPinIcon />}
          title="No saved addresses"
          panel
          actions={
            <Button onClick={() => setEditing("new")}>
              <PlusIcon />
              Add an address
            </Button>
          }
        >
          Save an address here, or tick "Save to my profile" at checkout.
        </EmptyState>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {addresses.map((address: Address) =>
            editing === address.id ? (
              <AddressForm
                key={address.id}
                title="Edit address"
                className="sm:col-span-2"
                initial={toInput(address)}
                submitLabel="Save changes"
                pending={update.isPending}
                onCancel={() => setEditing(null)}
                onSubmit={(input) => update.mutate({ id: address.id, input }, { onSuccess: () => setEditing(null) })}
              />
            ) : (
              <section
                key={address.id}
                aria-label={`${address.label || address.name} address`}
                className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 lg:p-6"
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-xl">{address.label || address.name}</h2>
                  {address.isDefault && <Badge variant="neutral">Default</Badge>}
                </div>
                <p className="text-sm">{address.name}</p>
                <p className="text-sm text-muted">
                  {address.line1}
                  {address.line2 && `, ${address.line2}`}
                </p>
                <p className="text-sm text-muted">
                  {address.postalCode} {address.city}
                </p>
                <p className="text-sm text-muted">{address.country}</p>
                {user?.phone && <p className="text-sm text-muted">{user.phone}</p>}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Button variant="secondary" size="sm" onClick={() => setEditing(address.id)}>
                    <PencilIcon />
                    Edit
                  </Button>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    loading={remove.isPending && remove.variables === address.id}
                    onClick={() => {
                      if (window.confirm("Remove this address?")) remove.mutate(address.id);
                    }}
                  >
                    <TrashIcon />
                    Remove
                  </Button>
                </div>
              </section>
            ),
          )}

          {editing !== "new" && (
            <button
              type="button"
              onClick={() => setEditing("new")}
              className={cn(
                "flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-input p-6 text-center transition-colors hover:bg-surface-2",
                focusRing,
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-surface-2 text-muted">
                <PlusIcon className="size-5" />
              </span>
              <span className="font-semibold">Add a new address</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

type AddressFormProps = {
  title: string;
  initial: AddressInput;
  submitLabel: string;
  pending: boolean;
  /** Show "make this my default" (only when adding, and the user has other addresses). */
  showDefaultOption?: boolean;
  className?: string;
  onSubmit: (input: AddressInput, isDefault: boolean) => void;
  onCancel: () => void;
};

function AddressForm({
  title,
  initial,
  submitLabel,
  pending,
  showDefaultOption = false,
  className,
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
      aria-label={title}
      className={cn("flex flex-col gap-4 rounded-lg border border-border bg-surface p-4 lg:p-6", className)}
    >
      <h2 className="text-xl">{title}</h2>
      <AddressFields value={value} onChange={setValue} errors={errors} disabled={pending} withLabel />
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
