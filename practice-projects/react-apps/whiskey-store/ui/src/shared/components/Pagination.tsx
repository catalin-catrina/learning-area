import { cn } from "cn";
import { ChevronLeftIcon, ChevronRightIcon, focusRing } from "../ui";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const item =
  "inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-md border px-3 text-sm font-semibold transition-colors pointer-coarse:h-11 pointer-coarse:min-w-11";
const idle = "border-border text-fg hover:bg-surface-2";
const off = "cursor-not-allowed border-surface-2 bg-surface-2 text-muted";

// Page numbers to show: always first, last, current ±1, with "…" gaps.
function pagesToShow(page: number, total: number): (number | "gap")[] {
  const keep = new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total));
  const sorted = [...keep].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
    out.push(p);
  });
  return out;
}

// Desktop: Prev 1 2 3 4 Next. Mobile: ‹ Page 1 of 4 ›.
function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 pt-4">
      <button
        type="button"
        disabled={!hasPrev}
        onClick={() => onPageChange(page - 1)}
        className={cn(item, focusRing, hasPrev ? idle : off)}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="size-4" />
        <span className="hidden lg:inline">Prev</span>
      </button>

      <span className="px-4 text-sm font-semibold lg:hidden" aria-live="polite">
        Page {page} of {totalPages}
      </span>

      <ul className="hidden items-center gap-2 lg:flex">
        {pagesToShow(page, totalPages).map((p, i) =>
          p === "gap" ? (
            <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-muted">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === page ? "page" : undefined}
                aria-label={`Page ${p}`}
                className={cn(item, focusRing, p === page ? "border-accent bg-accent text-accent-fg" : idle)}
              >
                {p}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className={cn(item, focusRing, hasNext ? idle : off)}
        aria-label="Next page"
      >
        <span className="hidden lg:inline">Next</span>
        <ChevronRightIcon className="size-4" />
      </button>
    </nav>
  );
}

export default Pagination;
