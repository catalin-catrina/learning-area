import {
  useCheckoutElements,
  PaymentElement,
} from "@stripe/react-stripe-js/checkout";
import { useState } from "react";

function CheckoutForm() {
  const checkoutState = useCheckoutElements();
  // 1. Track the email in React state (optionally pre-filled from useAuth):
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (checkoutState.type === "loading") {
    return <p>Loading payment form...</p>;
  }

  if (checkoutState.type === "error") {
    return <p>Error: {checkoutState.error.message}</p>;
  }

  // Once type === "success", checkoutState.checkout is available!
  const { checkout } = checkoutState;

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = await checkout.confirm({email});
    if (result.type === "error") {
      setErrorMessage(result.error.message);
      console.log("Payment confirmation error:", result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
      />
      <PaymentElement />
      {errorMessage && <div role="alert">{errorMessage}</div>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 rounded-md bg-blue-600 px-6 py-2 text-white disabled:opacity-40"
      >
        Pay
      </button>
    </form>
  );
}

export default CheckoutForm;
