import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "cn";
import {
  ArrowRightIcon,
  BottleIcon,
  buttonClasses,
  GiftIcon,
  LockIcon,
  OfferIcon,
  ShieldIcon,
  TruckIcon,
} from "../../../shared/ui";
import Container from "../../../shared/layout/Container";
import { ProductCard, ProductCardSkeleton, ProductGrid } from "../../products/components/ProductCard";
import { useProducts } from "../../products/hooks/useProducts";
import type { ProductsFilters } from "../../products/product.types";
import { CATEGORY_LINKS } from "../../products/productLabels";

// No design for this page: it's built from the same tokens and components as
// the rest (Container, buttonClasses, ProductCard, panels with border-border).
//
// Images: drop files into ui/public/home/ with these names. Until a file
// exists, its slot shows a placeholder, so nothing breaks.
//   hero.webp          ~1200×1000, the bottle/glass shot beside the headline
//   single-malt.webp   ~800×600 each, one per category tile
//   blends.webp
//   gifts.webp
//   offers.webp
const IMG = "/home";

const CATEGORY_EXTRAS: Record<string, { blurb: string; image: string; icon: React.ReactNode }> = {
  "Single malt": { blurb: "One distillery, one malted barley.", image: `${IMG}/single-malt.webp`, icon: <BottleIcon /> },
  Blends: { blurb: "Smooth, balanced, made for sharing.", image: `${IMG}/blends.webp`, icon: <BottleIcon /> },
  Gifts: { blurb: "Bottles that come in a gift box.", image: `${IMG}/gifts.webp`, icon: <GiftIcon /> },
  Offers: { blurb: "Good whisky for less, while it lasts.", image: `${IMG}/offers.webp`, icon: <OfferIcon /> },
};

function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16 lg:gap-24 lg:pb-24">
      <Hero />

      <Container>
        <section aria-labelledby="categories-title" className="flex flex-col gap-6">
          <SectionHeading id="categories-title" title="Shop by category" />
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
            {CATEGORY_LINKS.map((c) => {
              const extra = CATEGORY_EXTRAS[c.label];
              return (
                <li key={c.to}>
                  <Link
                    to={c.to}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-[border-color,box-shadow] hover:border-input hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <HomeImage src={extra?.image} icon={extra?.icon} className="aspect-4/3" />
                    <div className="flex flex-1 flex-col gap-1 border-t border-border p-3 lg:p-4">
                      <span className="flex items-center gap-1 font-heading text-lg font-medium lg:text-xl">
                        {c.label}
                        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                      </span>
                      {extra && <span className="text-sm text-muted">{extra.blurb}</span>}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>

      <Container>
        <ProductRail
          id="top-rated"
          title="Top rated"
          filters={{ sort: "rating_desc", inStock: true, limit: 4 }}
          link={{ label: "Shop all whisky", to: "/products" }}
        />
      </Container>

      <Container>
        <ProductRail
          id="on-offer"
          title="On offer now"
          filters={{ onSale: true, sort: "rating_desc", limit: 4 }}
          link={{ label: "See all offers", to: "/products?onSale=true" }}
        />
      </Container>

      <Container>
        <Perks />
      </Container>

      <Container>
        <section
          aria-labelledby="peated-title"
          className="flex flex-col items-start gap-4 rounded-lg border border-border bg-surface-2 p-6 lg:flex-row lg:items-center lg:p-10"
        >
          <div className="flex flex-col gap-2">
            <h2 id="peated-title" className="text-2xl lg:text-3xl">
              Into smoke?
            </h2>
            <p className="max-w-[52ch] text-muted">
              Islay and other peated malts: bonfire, sea salt and iodine. Not for everyone, unforgettable for some.
            </p>
          </div>
          <Link to="/products?peated=true" className={buttonClasses({ variant: "secondary", className: "lg:ml-auto" })}>
            Shop peated whisky
            <ArrowRightIcon />
          </Link>
        </section>
      </Container>
    </div>
  );
}

function Hero() {
  return (
    <Container className="pt-6 lg:pt-10">
      <section
        aria-labelledby="hero-title"
        className="grid items-center gap-6 overflow-hidden rounded-lg border border-border bg-surface lg:grid-cols-2 lg:gap-0"
      >
        <div className="order-2 flex flex-col items-start gap-5 p-6 pt-0 lg:order-1 lg:p-16">
          <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted">Independent whisky merchants</p>
          <h1 id="hero-title" className="text-[40px] leading-[1.05] text-balance lg:text-5xl">
            Find your next favourite dram
          </h1>
          <p className="max-w-[46ch] text-base leading-[26px] text-muted lg:text-lg">
            Single malts, blends and rare bottlings, chosen by people who drink them. Free delivery on orders over €100.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/products" className={buttonClasses({ className: "h-11 px-6" })}>
              Shop all whisky
              <ArrowRightIcon />
            </Link>
            <Link to="/products?onSale=true" className={buttonClasses({ variant: "secondary", className: "h-11 px-6" })}>
              See offers
            </Link>
          </div>
        </div>
        <HomeImage
          src={`${IMG}/hero.webp`}
          icon={<BottleIcon />}
          eager
          className="order-1 aspect-4/3 lg:order-2 lg:aspect-auto lg:h-full lg:min-h-130"
        />
      </section>
    </Container>
  );
}

function ProductRail({
  id,
  title,
  filters,
  link,
}: {
  id: string;
  title: string;
  filters: ProductsFilters;
  link: { label: string; to: string };
}) {
  const { data, isPending } = useProducts(filters);
  if (!isPending && !data?.data.length) return null; // e.g. no offers right now

  return (
    <section aria-labelledby={`${id}-title`} className="flex flex-col gap-6">
      <SectionHeading id={`${id}-title`} title={title} link={link} />
      <ProductGrid columns={4}>
        {isPending
          ? Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)
          : data?.data.map((p) => <ProductCard key={p.id} product={p} />)}
      </ProductGrid>
    </section>
  );
}

function SectionHeading({ id, title, link }: { id: string; title: string; link?: { label: string; to: string } }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 id={id} className="text-2xl lg:text-3xl">
        {title}
      </h2>
      {link && (
        <Link
          to={link.to}
          className="flex shrink-0 items-center gap-1 text-sm font-semibold underline-offset-3 hover:underline"
        >
          {link.label}
          <ArrowRightIcon className="size-4" />
        </Link>
      )}
    </div>
  );
}

const PERKS = [
  { icon: <TruckIcon />, title: "Free delivery over €100", text: "Standard delivery in 2–4 working days." },
  { icon: <ShieldIcon />, title: "Genuine bottles", text: "Sourced from distilleries and trusted importers." },
  { icon: <LockIcon />, title: "Secure checkout", text: "Card payments handled by Stripe." },
];

function Perks() {
  return (
    <ul aria-label="Why shop with us" className="grid gap-3 lg:grid-cols-3 lg:gap-6">
      {PERKS.map((p) => (
        <li key={p.title} className="flex items-start gap-3 rounded-lg border border-border p-4 lg:p-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent [&_svg]:size-5">
            {p.icon}
          </span>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{p.title}</p>
            <p className="text-sm text-muted">{p.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// An image slot that shows a soft placeholder (icon on surface-2) until the
// file exists. Decorative: the text around it says what it is, so alt="".
function HomeImage({
  src,
  icon,
  eager = false,
  className,
}: {
  src?: string;
  icon?: React.ReactNode;
  eager?: boolean;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden bg-surface-2", className)}>
      {src && !broken ? (
        <img
          src={src}
          alt=""
          loading={eager ? "eager" : "lazy"}
          onError={() => setBroken(true)}
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <span className="text-border [&_svg]:size-16 lg:[&_svg]:size-24">{icon}</span>
      )}
    </div>
  );
}

export default HomePage;
