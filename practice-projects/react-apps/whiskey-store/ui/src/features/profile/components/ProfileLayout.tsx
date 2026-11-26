import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "cn";
import Container from "../../../shared/layout/Container";
import { LogOutIcon, focusRing } from "../../../shared/ui";
import { useAuth } from "../../auth/hooks/useAuth";

const LINKS = [
  { to: "/profile", label: "Overview", end: true },
  { to: "/profile/orders", label: "Orders" },
  { to: "/profile/favorites", label: "Favorites" },
  { to: "/profile/addresses", label: "Addresses" },
];

// Designs 8a–8g: "My account" + page title, side navigation on desktop,
// scrolling tabs on mobile.
const ProfileLayout = () => {
  const { user, handleLogout } = useAuth();
  const { pathname } = useLocation();
  const current = LINKS.find((l) => (l.end ? pathname === l.to : pathname.startsWith(l.to)));
  const title = current?.end ? `Hi, ${user?.name.split(" ")[0] ?? "there"}` : current?.label;

  return (
    <Container className="pb-20">
      <div className="flex flex-col gap-1 pb-4 pt-8 lg:pb-6">
        <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted">My account</p>
        <h1 className="text-[30px] leading-9 lg:text-4xl">{title}</h1>
      </div>

      {/* Mobile tabs */}
      <nav aria-label="Account" className="-mx-4 mb-6 flex gap-1 overflow-x-auto border-b border-border px-4 lg:hidden">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={cn(
              "flex h-11 items-center whitespace-nowrap border-b-2 border-transparent px-3 text-sm font-semibold text-muted",
              "aria-[current=page]:border-accent aria-[current=page]:text-fg",
              focusRing,
            )}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <nav aria-label="Account" className="hidden flex-col gap-1 self-start lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold transition-colors hover:bg-surface-2",
                "aria-[current=page]:bg-surface-2",
                focusRing,
              )}
            >
              {l.label}
            </NavLink>
          ))}
          <hr className="my-2 border-border" />
          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "flex h-10 items-center gap-3 rounded-md px-3 text-left text-sm font-semibold transition-colors hover:bg-surface-2",
              focusRing,
            )}
          >
            <LogOutIcon className="size-4" />
            Sign out
          </button>
        </nav>

        <section className="min-w-0">
          <Outlet />
        </section>
      </div>
    </Container>
  );
};

export default ProfileLayout;
