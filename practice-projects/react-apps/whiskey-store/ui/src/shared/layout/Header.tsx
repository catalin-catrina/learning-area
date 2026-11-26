import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "cn";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import Sheet from "../components/Sheet";
import { BagIcon, Button, HeartIcon, LogOutIcon, MenuIcon, Search, SearchIcon, focusRing } from "../ui";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useCart } from "../../features/cart/hooks/useCart";
import { useGetFavorites } from "../../features/favorites/hooks/useFavorites";
import { CATEGORY_LINKS } from "../../features/products/productLabels";
import { useUiStore } from "../stores/uiStore";

const iconLink = cn(
  "relative inline-flex size-10 shrink-0 items-center justify-center rounded-md text-fg transition-colors hover:bg-surface-2 [&_svg]:size-5",
  focusRing,
);

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

// Design 1a header. Desktop: logo, category links, search, theme, favorites,
// account, cart. Mobile: menu, logo, search, theme, cart (the rest moves into
// the menu sheet).
function Header() {
  const { user, handleLogout } = useAuth();
  const { data: cart } = useCart();
  const { data: favorites } = useGetFavorites();
  const openCart = useUiStore((s) => s.openCart);
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const cartCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const favoriteCount = favorites?.length ?? 0;
  const currentSearch = location.pathname === "/products" ? (params.get("search") ?? "") : "";

  // A category link is "current" when the URL is exactly that list
  const isCurrent = (to: string) => `${location.pathname}${location.search}` === to;

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = String(new FormData(e.currentTarget).get("search") ?? "").trim();
    setMobileSearch(false);
    navigate(term ? `/products?search=${encodeURIComponent(term)}` : "/products");
  };

  const onCart = () => (user ? openCart() : navigate("/login", { state: { from: location } }));

  const searchForm = (autoFocus = false) => (
    // key: re-mounts the uncontrolled input when the URL's search changes
    <form role="search" onSubmit={onSearch} key={currentSearch} className="w-full">
      <Search name="search" defaultValue={currentSearch} autoFocus={autoFocus} placeholder="Search whisky, brands, regions" />
    </form>
  );

  return (
    <header className="border-b border-border bg-bg">
      <Container className="flex h-14 items-center gap-1 px-2 lg:h-18 lg:gap-8 lg:px-20">
        {/* Mobile: menu button */}
        <Button
          variant="ghost"
          className="w-10 px-0 lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon className="size-5" />
        </Button>

        <Link
          to="/products"
          className="ml-1 shrink-0 font-heading text-xl font-medium tracking-[-0.01em] lg:ml-0 lg:text-2xl"
        >
          Dramshop
        </Link>

        <nav aria-label="Main" className="hidden gap-6 text-sm font-semibold lg:flex">
          {CATEGORY_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={isCurrent(l.to) ? "page" : undefined}
              className="hover:underline hover:underline-offset-3 aria-[current=page]:underline aria-[current=page]:underline-offset-3"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden max-w-110 flex-1 lg:block">{searchForm()}</div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            className="w-10 px-0 lg:hidden"
            aria-label="Search"
            aria-expanded={mobileSearch}
            onClick={() => setMobileSearch((s) => !s)}
          >
            <SearchIcon className="size-5" />
          </Button>

          <ThemeToggle />

          {user && (
            <Link
              to="/profile/favorites"
              className={cn(iconLink, "hidden lg:inline-flex")}
              aria-label={`Favorites, ${favoriteCount} saved`}
            >
              <HeartIcon />
            </Link>
          )}

          {user ? (
            <Link
              to="/profile"
              className={cn(
                "hidden h-10 items-center gap-2 rounded-md pl-1.5 pr-2 text-sm font-semibold transition-colors hover:bg-surface-2 lg:inline-flex",
                focusRing,
              )}
            >
              <span
                aria-hidden="true"
                className="flex size-7 items-center justify-center rounded-full border border-border bg-surface-2 text-xs font-bold"
              >
                {initials(user.name)}
              </span>
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              to="/login"
              className={cn(
                "hidden h-10 items-center rounded-md px-2 text-sm font-semibold transition-colors hover:bg-surface-2 lg:inline-flex",
                focusRing,
              )}
            >
              Sign in
            </Link>
          )}

          <button
            type="button"
            className={iconLink}
            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            aria-haspopup="dialog"
            onClick={onCart}
          >
            <BagIcon />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-0.5 top-0 h-5 min-w-5 rounded-full bg-accent px-1 text-center text-2xs font-bold leading-5 text-accent-fg"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile: search row under the header */}
      {mobileSearch && <Container className="pb-3 lg:hidden">{searchForm(true)}</Container>}

      {/* Mobile menu */}
      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} side="left" title="Dramshop" closeLabel="Close menu">
        <nav aria-label="Menu" className="flex flex-col gap-6 py-4" onClick={(e) => {
          // any link click closes the menu
          if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}>
          <ul className="flex flex-col">
            {CATEGORY_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="flex h-11 items-center text-lg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col border-t border-border pt-4">
            <p className="pb-2 text-2xs font-semibold uppercase tracking-[0.12em] text-muted">Account</p>
            {user ? (
              <>
                <Link to="/profile" className="flex h-11 items-center">My account</Link>
                <Link to="/profile/orders" className="flex h-11 items-center">Orders</Link>
                <Link to="/profile/favorites" className="flex h-11 items-center">
                  Favorites{favoriteCount > 0 && <span className="ml-2 text-muted">{favoriteCount}</span>}
                </Link>
                <Link to="/profile/addresses" className="flex h-11 items-center">Addresses</Link>
                <button
                  type="button"
                  className="flex h-11 items-center gap-2 text-left"
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOutIcon className="size-4" /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex h-11 items-center">Sign in</Link>
                <Link to="/register" className="flex h-11 items-center">Create an account</Link>
              </>
            )}
          </div>
        </nav>
      </Sheet>
    </header>
  );
}

export default Header;
