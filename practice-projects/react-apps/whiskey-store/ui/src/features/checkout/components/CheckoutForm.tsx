import {
  useCheckoutElements,
  PaymentElement,
} from "@stripe/react-stripe-js/checkout";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { Button } from "../../../shared/ui";
import { getStripeAppearance } from "../stripeAppearance";

function CheckoutForm() {
  const checkoutState = useCheckoutElements();
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Re-theme Stripe's iframe when the user switches light/dark mid-checkout.
  // A MutationObserver watches the class attribute on <html> (where useTheme
  // puts "dark"), so this works no matter which component toggles the theme.
  const checkout = checkoutState.type === "success" ? checkoutState.checkout : null;
  useEffect(() => {
    if (!checkout) return;
    const observer = new MutationObserver(() =>
      checkout.changeAppearance(getStripeAppearance()),
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [checkout]);

  if (checkoutState.type === "loading") {
    return <p className="text-muted">Loading payment form…</p>;
  }

  if (checkoutState.type === "error") {
    return <p className="text-danger">Error: {checkoutState.error.message}</p>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    // No email argument: the backend creates the Checkout Session with the
    // account email (customer_email), so Stripe already has it.
    const result = await checkoutState.checkout.confirm();
    if (result.type === "error") {
      setErrorMessage(result.error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {user && (
        <p className="text-sm text-muted">
          Receipt goes to <span className="font-semibold text-fg">{user.email}</span>
        </p>
      )}
      <PaymentElement />
      {errorMessage && (
        <p role="alert" className="text-sm text-danger">
          {errorMessage}
        </p>
      )}
      <Button type="submit" loading={isSubmitting} className="self-start">
        {isSubmitting ? "Paying…" : "Pay"}
      </Button>
    </form>
  );
}

export default CheckoutForm;
