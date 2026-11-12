import { loadStripe } from "@stripe/stripe-js";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";

import { environment } from "../../../config/environment";
import { useParams } from "react-router-dom";
import { usePaymentSession } from "../hooks/useCheckout";
import CheckoutForm from "./CheckoutForm";

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
    <div>
      <CheckoutElementsProvider  
        stripe={stripePromise}
        options={{ clientSecret: data?.clientSecret }}
      >
        <CheckoutForm />
      </CheckoutElementsProvider>
    </div>
  );
}

export default CheckoutPage;
