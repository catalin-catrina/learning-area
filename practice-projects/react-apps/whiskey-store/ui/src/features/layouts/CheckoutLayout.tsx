import { Outlet } from "react-router-dom";
import CheckoutHeader from "../../shared/layout/CheckoutHeader";

const CheckoutLayout = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <CheckoutHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default CheckoutLayout;
