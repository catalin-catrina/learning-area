import { useId } from "react";
import { cn } from "cn";
import Spinner from "./Spinner";
import { SearchIcon } from "./icons";
import { fieldBorder, fieldBox } from "./styles";

type SearchProps = Omit<React.ComponentProps<"input">, "type"> & {
  /** Read by screen readers only; there's no visible label. */
  label?: string;
  /** Fetching results: the spinner replaces the magnifier. */
  loading?: boolean;
};

// Put it inside <form role="search" onSubmit={...}> where you use it (the
// Header pattern). The form is the pattern's job, not the primitive's.
function Search({
  label = "Search the shop",
  placeholder = "Whisky, brands, regions",
  loading = false,
  id,
  className,
  ...rest
}: SearchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    // `group` lets the icon react to the input's focus (muted → fg)
    <div className={cn("group relative w-full", className)}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-fg">
        {loading ? <Spinner /> : <SearchIcon className="size-4" />}
      </span>
      <input
        id={inputId}
        type="search"
        placeholder={placeholder}
        aria-busy={loading || undefined}
        className={cn(fieldBox, fieldBorder.normal, "pl-9 pr-3")}
        {...rest}
      />
    </div>
  );
}

export default Search;
