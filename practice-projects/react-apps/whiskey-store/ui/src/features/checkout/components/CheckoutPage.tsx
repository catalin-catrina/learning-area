import { loadStripe } from "@stripe/stripe-js";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import { Link, Navigate, useParams } from "react-router-dom";
import { environment } from "../../../config/environment";
import Container from "../../../shared/layout/Container";
import EmptyState from "../../../shared/components/EmptyState";
import { Free, SummaryLines, SummaryPanel, SummaryRow, SummaryTotal } from "../../../shared/components/OrderSummary";
import { AlertIcon, Button, buttonClasses } from "../../../shared/ui";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { useGetOrder } from "../../orders/hooks/useOrders";
import { usePaymentSession } from "../hooks/useCheckout";
import { getStripeAppearance, stripeFonts } from "../stripeAppearance";
import CheckoutStepper from "./CheckoutStepper";
import CheckoutForm from "./CheckoutForm";
import { CheckoutSkeleton } from "./ShippingPage";

const stripePromise = loadStripe(environment.stripePublishableKey);

// Step 3 of checkout (designs 6a / 6b). The order already exists (created by
// the shipping step); this page pays for it.
function CheckoutPage() {
  const { orderId } = useParams();
  const id = Number(orderId);
  const { data: order, isPending: orderPending, isError: orderError } = useGetOrder(id);
  const session = usePaymentSession(id, { enabled: order?.status === "PENDING" });

  if (orderPending) return <CheckoutSkeleton />;
  if (orderError || !order) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<AlertIcon />}
          title="We couldn't find this order"
          panel
          actions={
            <Link to="/profile/orders" className={buttonClasses()}>
              Your orders
            </Link>
          }
        />
      </Container>
    );
  }
  // Already paid (or cancelled): there's nothing to pay here any more
  if (order.status !== "PENDING") return <Navigate to={`/orders/${order.id}`} replace />;

  const a = order.shippingAddress;

  return (
    <Container className="pb-20">
      <CheckoutStepper current={3} />

      <div className="flex max-w-[1120px] flex-col gap-8 pt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-[30px] leading-9 lg:text-4xl">Payment</h1>
            <p className="text-sm text-muted">All transactions are encrypted. We never see or store your card number.</p>
          </div>

          <div className="flex flex-col rounded-lg border border-border bg-surface px-4 lg:px-6">
            <div className="flex flex-col gap-1 border-b border-border py-4 lg:py-5">
              <h2 className="font-sans text-2xs font-semibold uppercase tracking-[0.12em] text-muted">Ship to</h2>
              <p className="text-sm">
                {a.name} · {a.line1}
                {a.line2 && `, ${a.line2}`}, {a.postalCode} {a.city}, {a.country}
              </p>
            </div>
            <div className="flex flex-col gap-1 py-4 lg:py-5">
              <h2 className="font-sans text-2xs font-semibold uppercase tracking-[0.12em] text-muted">Delivery</h2>
              <p className="text-sm">Standard · 2–4 working days · Free</p>
            </div>
          </div>

          {session.isError ? (
            <EmptyState
              icon={<AlertIcon />}
              title="We couldn't start the payment"
              panel
              actions={<Button onClick={() => session.refetch()}>Try again</Button>}
            >
              Nothing was charged. Please try again in a moment.
            </EmptyState>
          ) : session.data ? (
            <CheckoutElementsProvider
              stripe={stripePromise}
              options={{
                clientSecret: session.data.clientSecret,
                // Read once when the form mounts; CheckoutForm updates it on theme changes
                elementsOptions: { appearance: getStripeAppearance(), fonts: stripeFonts },
              }}
            >
              <CheckoutForm totalCents={order.totalCents} />
            </CheckoutElementsProvider>
          ) : (
            <CheckoutForm.Placeholder />
          )}
        </div>

        <SummaryPanel titleId="payment-summary">
          <SummaryLines
            lines={order.items.map((i) => ({
              key: i.id,
              name: i.productName,
              imageUrl: i.product?.imageUrl,
              unitCents: i.unitPriceCents,
              quantity: i.quantity,
            }))}
          />
          <hr className="border-border" />
          <SummaryRow label="Subtotal" value={formatPrice(order.totalCents)} />
          <SummaryRow label="Delivery · Standard, 2–4 working days" value={<Free />} />
          <hr className="border-border" />
          <SummaryTotal totalCents={order.totalCents} />
          <p className="text-xs text-muted">Includes VAT.</p>
        </SummaryPanel>
      </div>
    </Container>
  );
}

export default CheckoutPage;
