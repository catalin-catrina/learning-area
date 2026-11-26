import { useState } from "react";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { cn } from "cn";
import Container from "../../../shared/layout/Container";
import EmptyState from "../../../shared/components/EmptyState";
import { Free, SummaryLines, SummaryPanel, SummaryRow, SummaryTotal } from "../../../shared/components/OrderSummary";
import { Alert, ArrowLeftIcon, BagIcon, Badge, Button, buttonClasses, Checkbox, PlusIcon, Skeleton } from "../../../shared/ui";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { useAuth } from "../../auth/hooks/useAuth";
import { useCart } from "../../cart/hooks/useCart";
import { cartTotals } from "../../cart/cartTotals";
import { useCreateOrder } from "../../orders/hooks/useOrders";
import { useAddresses } from "../../addresses/hooks/useAddresses";
import AddressFields from "../../addresses/components/AddressFields";
import { emptyAddress, validateAddress, type Address, type AddressErrors } from "../../addresses/address.types";
import CheckoutStepper from "./CheckoutStepper";

// Step 2 of checkout (designs 5a / 5b): where should this order go?
// - the default address is preselected
// - any other saved address can be picked instead
// - or a new address, optionally saved to the profile (and made the default)

type Choice = number | "new"; // a saved address id, or the new-address form

const radioCard = cn(
  "relative flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-input",
  "has-[input:checked]:border-accent has-[input:checked]:shadow-[inset_0_0_0_1px_var(--accent)]",
  "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring",
);

function RadioDot() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-input peer-checked:border-accent peer-checked:after:size-2 peer-checked:after:rounded-full peer-checked:after:bg-accent peer-checked:after:content-['']"
    />
  );
}

function ShippingPage() {
  const { user, handleLogout } = useAuth();
  const { data: addresses, isPending: addressesPending, isError: addressesError } = useAddresses();
  const { data: cart, isPending: cartPending } = useCart();
  const createOrder = useCreateOrder();

  // `null` = the user hasn't picked anything yet. The effective choice is then
  // derived from the data (the default address, or "new" if there are none),
  // instead of copying it into state with a useEffect.
  const [picked, setPicked] = useState<Choice | null>(null);
  const [newAddress, setNewAddress] = useState(emptyAddress);
  const [errors, setErrors] = useState<AddressErrors>({});
  const [saveAddress, setSaveAddress] = useState(true);
  const [makeDefault, setMakeDefault] = useState(false);

  const { count, subtotalCents, savedCents } = cartTotals(cart);

  if (cartPending || addressesPending) return <CheckoutSkeleton />;
  if (count === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<BagIcon />}
          title="Your cart is empty"
          panel
          actions={
            <Link to="/products" className={buttonClasses()}>
              Back to the shop
            </Link>
          }
        >
          Add a bottle before checking out.
        </EmptyState>
      </Container>
    );
  }

  const saved = addressesError ? [] : addresses;
  const defaultId = saved.find((a) => a.isDefault)?.id ?? saved[0]?.id;
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
    createOrder.mutate({
      shippingAddress: newAddress,
      saveAddress,
      makeDefault: saveAddress && makeDefault,
    });
  };

  const serverError = createOrder.isError
    ? (isAxiosError(createOrder.error) && createOrder.error.response?.data?.error) ||
      "Something went wrong while creating your order. Please try again."
    : null;

  return (
    <Container className="pb-20">
      <CheckoutStepper current={2} />

      <div className="flex max-w-[1120px] flex-col gap-8 pt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
        <form onSubmit={handleSubmit} noValidate className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-[30px] leading-9 lg:text-4xl">Shipping</h1>
            <p className="text-sm text-muted">
              Ordering as {user?.email} ·{" "}
              <button type="button" onClick={handleLogout} className="font-semibold text-fg underline underline-offset-3">
                Not you?
              </button>
            </p>
          </div>

          <fieldset className="flex flex-col gap-3" disabled={createOrder.isPending}>
            <legend className="mb-3 font-heading text-xl">Delivery address</legend>

            {saved.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {saved.map((a) => (
                  <label key={a.id} className={radioCard}>
                    <input
                      type="radio"
                      name="shipTo"
                      className="peer sr-only"
                      checked={choice === a.id}
                      onChange={() => setPicked(a.id)}
                    />
                    <RadioDot />
                    <SavedAddress address={a} phone={user?.phone} />
                    {/* z-10: sits above the card so it stays its own link */}
                    <Link to="/profile/addresses" className="relative z-10 text-sm font-semibold underline underline-offset-3">
                      Edit
                    </Link>
                  </label>
                ))}
              </div>
            )}

            {saved.length > 0 && (
              <label className={cn(radioCard, "items-center")}>
                <input
                  type="radio"
                  name="shipTo"
                  className="peer sr-only"
                  checked={choice === "new"}
                  onChange={() => setPicked("new")}
                />
                <RadioDot />
                <span className="font-semibold">Use a different address</span>
                <PlusIcon className="ml-auto size-4" />
              </label>
            )}

            {choice === "new" && (
              <fieldset className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4 lg:p-6">
                <legend className="sr-only">New delivery address</legend>
                <AddressFields
                  value={newAddress}
                  onChange={setNewAddress}
                  errors={errors}
                  withLabel={saveAddress}
                />
                <div className="flex flex-col pt-1">
                  <Checkbox
                    label="Save to my profile"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                  />
                  {saved.length > 0 && (
                    <Checkbox
                      label="Make this my default address"
                      checked={saveAddress && makeDefault}
                      disabled={!saveAddress}
                      onChange={(e) => setMakeDefault(e.target.checked)}
                    />
                  )}
                </div>
              </fieldset>
            )}
          </fieldset>

          {serverError && <Alert title="We couldn't create your order">{serverError}</Alert>}

          <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
            <Link to="/cart" className={buttonClasses({ variant: "ghost" })}>
              <ArrowLeftIcon />
              Back to cart
            </Link>
            <Button type="submit" loading={createOrder.isPending}>
              {createOrder.isPending ? "Creating order…" : "Continue to payment"}
            </Button>
          </div>
        </form>

        <SummaryPanel titleId="shipping-summary">
          <SummaryLines
            lines={cart!.items.map((i) => ({
              key: i.id,
              name: i.product.name,
              imageUrl: i.product.imageUrl,
              unitCents: i.product.priceCents,
              quantity: i.quantity,
            }))}
          />
          <hr className="border-border" />
          <SummaryRow label="Subtotal" value={formatPrice(subtotalCents)} />
          <SummaryRow label="Delivery · Standard, 2–4 working days" value={<Free />} />
          <hr className="border-border" />
          <SummaryTotal totalCents={subtotalCents} />
          <p className="text-xs text-muted">
            Includes VAT.{savedCents > 0 && ` You saved ${formatPrice(savedCents)}.`}
          </p>
        </SummaryPanel>
      </div>
    </Container>
  );
}

/** Text block of a saved address card. Also used by the account pages. */
export function SavedAddress({ address: a, phone }: { address: Address; phone?: string }) {
  return (
    <span className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="flex items-center gap-2">
        <span className="font-semibold">{a.label || a.name}</span>
        {a.isDefault && <Badge variant="neutral">Default</Badge>}
      </span>
      <span className="text-sm">{a.name}</span>
      <span className="text-sm text-muted">
        {a.line1}
        {a.line2 && `, ${a.line2}`}
      </span>
      <span className="text-sm text-muted">
        {a.postalCode} {a.city}
      </span>
      <span className="text-sm text-muted">{a.country}</span>
      {phone && <span className="text-sm text-muted">{phone}</span>}
    </span>
  );
}

export function CheckoutSkeleton() {
  return (
    <Container className="pb-20" aria-busy="true">
      <span className="sr-only">Loading checkout</span>
      <Skeleton className="mt-6 h-6 w-64" />
      <div className="flex max-w-[1120px] flex-col gap-8 pt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
        </div>
        <Skeleton className="h-80" />
      </div>
    </Container>
  );
}

export default ShippingPage;
