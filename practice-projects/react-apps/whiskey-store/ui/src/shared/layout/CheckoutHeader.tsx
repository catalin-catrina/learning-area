import { Link } from "react-router-dom";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { LockIcon } from "../ui";

// Design 5a: checkout swaps the shop header for a slim one (no navigation to
// distract from paying) and drops the footer.
function CheckoutHeader() {
  return (
    <header className="border-b border-border bg-bg">
      <Container className="flex h-14 items-center gap-4 lg:h-18 lg:gap-8">
        <Link to="/products" className="shrink-0 font-heading text-xl font-medium tracking-[-0.01em] lg:text-2xl">
          Dramshop
        </Link>
        <span className="flex items-center gap-2 text-sm font-semibold text-muted">
          <LockIcon className="size-4" />
          Secure checkout
        </span>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}

export default CheckoutHeader;
