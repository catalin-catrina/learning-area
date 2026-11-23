import { useState } from "react";
import { isAxiosError } from "axios";
import { Button, Checkbox, Spinner, focusRing } from "../../../shared/ui";
import { useCreateOrder } from "../../orders/hooks/useOrders";
import { useAddresses } from "../../addresses/hooks/useAddresses";
import AddressFields from "../../addresses/components/AddressFields";
import AddressSummary from "../../addresses/components/AddressSummary";
import {
  emptyAddress,
  validateAddress,
  type AddressErrors,
} from "../../addresses/address.types";

// Step 1 of checkout: where should this order go?
// - the default address is preselected
// - any other saved address can be picked instead
// - or a new address, optionally saved to the profile
// Layout is intentionally plain: it gets its real design in the pages phase.

type Choice = number | "new"; // a saved address id, or the new-address form

function ShippingPage() {
  const { data: addresses, isPending: addressesPending, isError: addressesError } = useAddresses();
  const createOrder = useCreateOrder();

  // `null` = the user hasn't picked anything yet. The effective choice is then
  // derived from the data (the default address, or "new" if there are none),
  // instead of copying it into state with a useEffect.
  const [picked, setPicked] = useState<Choice | null>(null);
  const [newAddress, setNewAddress] = useState(emptyAddress);
  const [errors, setErrors] = useState<AddressErrors>({});
  const [saveAddress, setSaveAddress] = useState(true);

  if (addressesPending) return <Spinner />;
  if (addressesError) return <p className="text-danger">Could not load your addresses.</p>;

  const defaultId = addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id;
  const choice: Choice = picked ?? defaultId ?? "new";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (choice !== "new") {
      createOrder.mutate({ addressId: choice });
      return;
    }

    const found = validateAddress(newAddress);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    createOrder.mutate({ shippingAddress: newAddress, saveAddress });
  };

  const serverError = createOrder.isError
    ? (isAxiosError(createOrder.error) && createOrder.error.response?.data?.error) ||
      "Something went wrong while creating your order. Please try again."
    : null;

  const option = (selected: boolean) =>
    [
      "flex cursor-pointer items-start gap-3 rounded-md border bg-surface p-4 transition-colors hover:bg-surface-2",
      selected ? "border-accent" : "border-border",
    ].join(" ");

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto flex max-w-2xl flex-col gap-6 p-6">
      <h1 className="text-3xl">Shipping</h1>

      <fieldset className="flex flex-col gap-3" disabled={createOrder.isPending}>
        <legend className="mb-3 text-sm font-semibold text-fg">Ship to</legend>

        {addresses.map((address) => (
          <label key={address.id} className={option(choice === address.id)}>
            <input
              type="radio"
              name="shipTo"
              checked={choice === address.id}
              onChange={() => setPicked(address.id)}
              className={`mt-0.5 size-4 accent-accent ${focusRing}`}
            />
            <span className="flex flex-col gap-1">
              {address.isDefault && (
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Default
                </span>
              )}
              <AddressSummary address={address} />
            </span>
          </label>
        ))}

        {addresses.length > 0 && (
          <label className={option(choice === "new")}>
            <input
              type="radio"
              name="shipTo"
              checked={choice === "new"}
              onChange={() => setPicked("new")}
              className={`mt-0.5 size-4 accent-accent ${focusRing}`}
            />
            <span className="text-sm font-semibold text-fg">Use a different address</span>
          </label>
        )}

        {choice === "new" && (
          <div className="flex flex-col gap-4 pt-2">
            <AddressFields value={newAddress} onChange={setNewAddress} errors={errors} />
            <Checkbox
              label={
                addresses.length === 0
                  ? "Save this address to my profile (it becomes your default)"
                  : "Save this address to my profile"
              }
              checked={saveAddress}
              onChange={(e) => setSaveAddress(e.target.checked)}
            />
          </div>
        )}
      </fieldset>

      {serverError && (
        <p role="alert" className="text-sm text-danger">
          {serverError}
        </p>
      )}

      <Button type="submit" loading={createOrder.isPending} className="self-start">
        {createOrder.isPending ? "Creating order…" : "Continue to payment"}
      </Button>
    </form>
  );
}

export default ShippingPage;
