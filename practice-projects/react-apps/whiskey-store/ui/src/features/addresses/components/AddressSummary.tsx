import type { AddressInput } from "../address.types";

// An address as readable lines. Works for saved addresses and order snapshots.
function AddressSummary({ address }: { address: Omit<AddressInput, "line2"> & { line2?: string | null } }) {
  return (
    <address className="text-sm not-italic text-fg">
      <span className="font-semibold">{address.name}</span>
      <br />
      {address.line1}
      {address.line2 && (
        <>
          , {address.line2}
        </>
      )}
      <br />
      {address.postalCode} {address.city}, {address.country}
    </address>
  );
}

export default AddressSummary;
