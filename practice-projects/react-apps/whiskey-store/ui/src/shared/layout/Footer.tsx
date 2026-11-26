import { Link } from "react-router-dom";
import Container from "./Container";
import { CATEGORY_LINKS } from "../../features/products/productLabels";

const columns = [
  {
    title: "Shop",
    links: [CATEGORY_LINKS[0], { label: "Gift boxes", to: CATEGORY_LINKS[2].to }, CATEGORY_LINKS[3]],
  },
  // Help pages don't exist yet: plain text for now
  { title: "Help", links: [{ label: "Shipping" }, { label: "Returns" }, { label: "Contact" }] },
  {
    title: "Account",
    links: [
      { label: "My account", to: "/profile" },
      { label: "Orders", to: "/profile/orders" },
      { label: "Favorites", to: "/profile/favorites" },
    ],
  },
] as { title: string; links: { label: string; to?: string }[] }[];

function Footer() {
  return (
    <footer className="border-t border-border py-8 text-sm lg:pb-10 lg:pt-12">
      <Container className="grid grid-cols-2 gap-6 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-8">
        <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
          <span className="font-heading text-2xl font-medium tracking-[-0.01em]">Dramshop</span>
          <p className="text-muted">Single malts from Speyside and beyond, delivered across the EU.</p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-sans text-2xs font-semibold uppercase tracking-[0.12em] text-muted">{col.title}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to} className="hover:underline hover:underline-offset-3">
                      {l.label}
                    </Link>
                  ) : (
                    <span className="text-muted">{l.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <p className="col-span-full border-t border-border pt-6 text-muted">
          Drink responsibly. You must be 18 or over to buy alcohol; ID is checked on delivery. Prices include VAT.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
