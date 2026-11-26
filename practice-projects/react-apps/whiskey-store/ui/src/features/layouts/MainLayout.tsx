import { Outlet } from "react-router-dom";
import Header from "../../shared/layout/Header";
import Footer from "../../shared/layout/Footer";
import CartDrawer from "../cart/components/CartDrawer";

const MainLayout = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default MainLayout;
