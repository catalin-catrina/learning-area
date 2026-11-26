import { Navigate, Route, Routes } from "react-router-dom";

import PublicRoute from "./shared/components/PublicRoute";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import MainLayout from "./features/layouts/MainLayout";
import CheckoutLayout from "./features/layouts/CheckoutLayout";
import ProductList from "./features/products/product-list/components/ProductList";
import ProductDetail from "./features/products/product-detail/components/ProductDetail";
import Cart from "./features/cart/components/Cart";
import CheckoutPage from "./features/checkout/components/CheckoutPage";
import ShippingPage from "./features/checkout/components/ShippingPage";
import PaymentReturnPage from "./features/checkout/components/PaymentReturnPage";
import OrdersPage from "./features/orders/components/OrdersPage";
import FavoritesPage from "./features/favorites/components/FavoritesPage";
import ProfileLayout from "./features/profile/components/ProfileLayout";
import ProfileOverview from "./features/profile/components/ProfileOverview";
import OrderDetailsPage from "./features/orders/components/OrderDetailsPage";
import AddressesPage from "./features/addresses/components/AddressesPage";
import Playground from "./pages/Playground";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/playground" element={<Playground />} />
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfileOverview />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="addresses" element={<AddressesPage />} />
          </Route>
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="/payment/return" element={<PaymentReturnPage />} />
        </Route>
      </Route>

      {/* Checkout: slim header, no footer (design 5a) */}
      <Route element={<CheckoutLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<ShippingPage />} />
          <Route path="/checkout/:orderId" element={<CheckoutPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
