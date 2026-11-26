import { useCheckoutElements, PaymentElement } from "@stripe/react-stripe-js/checkout";
import { useEffect, useId, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { Alert, Button, Checkbox, LockIcon, Spinner } from "../../../shared/ui";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { getStripeAppearance } from "../stripeAppearance";

// The Stripe part of the payment page: payment method, 18+ confirmation, Pay.
function CheckoutForm({ totalCents }: { totalCents: number }) {
  const checkoutState = useCheckoutElements();
  const { user } = useAuth();
  const headingId = useId();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAdult, setIsAdult] = useState(false);
  const [adultError, setAdultError] = useState(false);

  // Re-theme Stripe's iframe when the user switches light/dark mid-checkout.
  // A MutationObserver watches the class attribute on <html> (where useTheme
  // puts "dark"), so this works no matter which component toggles the theme.
  const checkout = checkoutState.type === "success" ? checkoutState.checkout : null;
  useEffect(() => {
    if (!checkout) return;
    const observer = new MutationObserver(() => checkout.changeAppearance(getStripeAppearance()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [checkout]);

  if (checkoutState.type === "loading") return <Placeholder />;

  if (checkoutState.type === "error") {
    return <Alert title="The payment form didn't load">{checkoutState.error.message}</Alert>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAdult) {
      setAdultError(true);
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);

    // No email argument: the backend creates the Checkout Session with the
    // account email (customer_email), so Stripe already has it.
    const result = await checkoutState.checkout.confirm();
    if (result.type === "error") setErrorMessage(result.error.message);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section aria-labelledby={headingId} className="flex flex-col gap-4">
        <h2 id={headingId} className="text-xl">
          Payment method
        </h2>
        {user && (
          <p className="text-sm text-muted">
            Receipt goes to <span className="font-semibold text-fg">{user.email}</span>
          </p>
        )}
        <div aria-busy={isSubmitting}>
          <PaymentElement />
        </div>
      </section>

      <Checkbox
        label="I confirm I'm 18 or over and agree to the terms of sale"
        checked={isAdult}
        onChange={(e) => {
          setIsAdult(e.target.checked);
          setAdultError(false);
        }}
        error={adultError ? "Please confirm you're 18 or over to continue." : undefined}
      />

      {errorMessage && <Alert title="Your payment didn't go through">{errorMessage}</Alert>}

      <div className="flex flex-col gap-2">
        <Button type="submit" loading={isSubmitting} className="w-full">
          {!isSubmitting && <LockIcon />}
          {isSubmitting ? "Processing payment…" : `Pay ${formatPrice(totalCents)}`}
        </Button>
        <p className="text-center text-xs text-muted">
          You'll be charged in euro. Your bank may ask you to confirm the payment.
        </p>
      </div>
    </form>
  );
}

/** While Stripe loads: a box the size of the payment fields (design 6a placeholder). */
function Placeholder() {
  return (
    <div
      aria-busy="true"
      className="flex min-h-75 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-surface-2 p-6 text-sm text-muted"
    >
      <Spinner className="size-5" />
      Loading the secure payment form…
    </div>
  );
}

CheckoutForm.Placeholder = Placeholder;

export default CheckoutForm;
