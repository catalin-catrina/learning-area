import { loadStripe } from "@stripe/stripe-js";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";

import { environment } from "../../../config/environment";
import { useParams } from "react-router-dom";
import { usePaymentSession } from "../hooks/useCheckout";
import CheckoutForm from "./CheckoutForm";
import { getStripeAppearance, stripeFonts } from "../stripeAppearance";

const stripePromise = loadStripe(environment.stripePublishableKey);

function CheckoutPage() {
  const { orderId } = useParams();
  const numericOrderId = Number(orderId);
  const { data, isPending, isError, refetch } =
    usePaymentSession(numericOrderId);

  if (isPending) return <p>Loading...</p>;

  if (isError) {
    return (
      <div role="alert">
        <p>Could not start checkout. Please try again.</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-6">
      <h1 className="text-3xl">Payment</h1>
      <CheckoutElementsProvider
        stripe={stripePromise}
        options={{
          clientSecret: data.clientSecret,
          // Read once when the form mounts; CheckoutForm updates it on theme changes
          elementsOptions: { appearance: getStripeAppearance(), fonts: stripeFonts },
        }}
      >
        <CheckoutForm />
      </CheckoutElementsProvider>
    </div>
  );
}

export default CheckoutPage;
