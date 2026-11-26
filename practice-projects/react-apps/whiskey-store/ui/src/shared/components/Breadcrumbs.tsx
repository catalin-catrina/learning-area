import { Fragment } from "react";
import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

// Home / Single malt / Glenfiddich 18. The last item (no `to`) is the current page.
function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2 pt-6 text-sm text-muted">
        {items.map((item, i) => (
          <Fragment key={`${item.label}-${i}`}>
            {i > 0 && (
              <li aria-hidden="true" className="select-none">
                /
              </li>
            )}
            <li className="min-w-0">
              {item.to ? (
                <Link to={item.to} className="underline underline-offset-3 hover:text-fg">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="line-clamp-1">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
