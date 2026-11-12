import { useState } from "react";
import { useCreateOrder } from "../../orders/hooks/useOrders";
import type { ShippingAddress } from "../../orders/order.types";

const initialShippingAddress: ShippingAddress = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  postalCode: "",
  country: "",
};

function ShippingPage() {
  const { mutate: createOrder, isPending, isError } = useCreateOrder();

  const [shippingAddress, setShippingAddress] = useState(
    initialShippingAddress,
  );

  function onSubmitShippingAddress(address: ShippingAddress) {
    createOrder(address);
  }

  if (isPending) return <p>Loading...</p>;

  if (isError) {
    return <p>Error occurred while submitting shipping address.</p>;
  }

  return (
    <div>
      <h1>Shipping Page</h1>
      <form>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={shippingAddress.name}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, name: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="line1">Line 1: </label>
          <input
            type="text"
            name="line1"
            id="line1"
            value={shippingAddress.line1}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, line1: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="line2">Line 2: </label>
          <input
            type="text"
            name="line2"
            id="line2"
            value={shippingAddress.line2}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, line2: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input
            type="text"
            name="city"
            id="city"
            value={shippingAddress.city}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code: </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={shippingAddress.postalCode}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                postalCode: e.target.value,
              })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="country">Country: </label>
          <input
            type="text"
            name="country"
            id="country"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                country: e.target.value,
              })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </form>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => onSubmitShippingAddress(shippingAddress)}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Go to payment
        </button>
      </div>
    </div>
  );
}

export default ShippingPage;
