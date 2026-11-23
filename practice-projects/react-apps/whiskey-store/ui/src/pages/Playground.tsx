import { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Price,
  QuantityStepper,
  Rating,
  RatingInput,
  Search,
  Select,
  TastingNoteChip,
  Toggle,
  GiftIcon,
} from "../shared/ui";
import { useTheme } from "../shared/hooks/useTheme";

// Every primitive in every state, on one page. Your "Figma":
// open it next to the component sheet and compare, in both themes.
// Remove the route before deploying (or keep it as a portfolio extra).

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 border-t border-border pt-6">
      <h2 className="text-xl">{title}</h2>
      {children}
    </section>
  );
}

const row = "flex flex-wrap items-center gap-4";

function Playground() {
  const { theme, toggleTheme } = useTheme();

  const [peated, setPeated] = useState(true);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [qty, setQty] = useState(2);
  const [rating, setRating] = useState<number | null>(null);
  const [notes, setNotes] = useState<string[]>(["Smoky"]);

  const toggleNote = (note: string) =>
    setNotes((prev) =>
      prev.includes(note) ? prev.filter((n) => n !== note) : [...prev, note],
    );

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl">Design system</h1>
        <Button variant="secondary" size="sm" onClick={toggleTheme}>
          {theme === "dark" ? "Light theme" : "Dark theme"}
        </Button>
      </header>

      <Section title="Button">
        {(["primary", "secondary", "ghost"] as const).map((variant) => (
          <div key={variant} className={row}>
            <Button variant={variant} size="sm">
              {variant} sm
            </Button>
            <Button variant={variant}>{variant} md</Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
            <Button variant={variant} loading>
              Adding…
            </Button>
            <Button variant={variant}>
              <GiftIcon />
              With icon
            </Button>
          </div>
        ))}
      </Section>

      <Section title="Input · Search · Select">
        <div className="grid gap-6 sm:grid-cols-2">
          <Input label="Email" placeholder="you@example.com" />
          <Input
            label="Email"
            defaultValue="leo@dramshop"
            error="Enter a valid email address"
          />
          <Input label="Username" defaultValue="leo" loading />
          <Input label="Phone" placeholder="+40 7xx xxx xxx" disabled />
          <Search />
          <Search loading defaultValue="Lagavulin" />
          <Select label="Sort by" defaultValue="newest">
            <option value="newest">Newest</option>
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
          </Select>
          <Select label="Country" loading />
          <Select label="Region" disabled>
            <option>Islay</option>
          </Select>
          <Select label="Volume" error="Pick a size" defaultValue="">
            <option value="" disabled>
              Choose…
            </option>
            <option>70cl</option>
          </Select>
        </div>
      </Section>

      <Section title="Checkbox · Toggle">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col">
            <Checkbox label="Islay" count={12} defaultChecked />
            <Checkbox label="Speyside" count={31} />
            <Checkbox label="Campbeltown" count={0} disabled />
            <Checkbox label="Highlands" count={8} disabled defaultChecked />
            <Checkbox
              label="I accept the terms"
              error="You need to accept the terms"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Toggle checked={peated} onCheckedChange={setPeated}>
              Peated only
            </Toggle>
            <Toggle checked={inStockOnly} onCheckedChange={setInStockOnly}>
              In stock only
            </Toggle>
            <Toggle checked={false} onCheckedChange={() => {}} loading>
              Saving off
            </Toggle>
            <Toggle checked onCheckedChange={() => {}} loading>
              Saving on
            </Toggle>
            <Toggle checked={false} onCheckedChange={() => {}} disabled>
              Disabled off
            </Toggle>
            <Toggle checked onCheckedChange={() => {}} disabled>
              Disabled on
            </Toggle>
          </div>
        </div>
      </Section>

      <Section title="Badge · Price">
        <div className={row}>
          <Badge variant="sale">-17%</Badge>
          <Badge variant="gift" />
          <Badge variant="outOfStock" />
          <Badge variant="inStock" />
        </div>
        <div className={row}>
          <Price priceCents={3990} />
          <Price priceCents={3990} compareAtPriceCents={4790} />
          <Price priceCents={3990} outOfStock />
          <Price priceCents={3990} loading />
        </div>
        <div className={row}>
          <Price size="page" priceCents={3990} compareAtPriceCents={4790} />
          <Price size="page" priceCents={12900} />
          <Price size="page" priceCents={0} loading />
        </div>
      </Section>

      <Section title="Rating">
        <Rating rating={4} reviewCount={1} reviewsHref="#reviews" />
        <Rating rating={3.6} reviewCount={27} />
        <Rating rating={0} reviewCount={0} writeHref="#write" />
        <RatingInput value={rating} onChange={setRating} />
        <RatingInput value={4} onChange={() => {}} loading />
        <RatingInput value={null} onChange={() => {}} disabled />
      </Section>

      <Section title="QuantityStepper · TastingNoteChip">
        <div className={row}>
          <QuantityStepper value={qty} onChange={setQty} max={5} />
          <QuantityStepper value={1} onChange={() => {}} />
          <QuantityStepper value={2} onChange={() => {}} loading />
          <QuantityStepper value={1} onChange={() => {}} disabled />
        </div>
        <div className={row}>
          {["Smoky", "Sherry", "Vanilla", "Citrus"].map((note) => (
            <TastingNoteChip
              key={note}
              selected={notes.includes(note)}
              onClick={() => toggleNote(note)}
            >
              {note}
            </TastingNoteChip>
          ))}
          <TastingNoteChip selected={false} disabled>
            Disabled
          </TastingNoteChip>
        </div>
      </Section>
    </div>
  );
}

export default Playground;
