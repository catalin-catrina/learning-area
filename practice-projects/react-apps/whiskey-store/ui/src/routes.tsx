import { Route, Routes } from "react-router-dom";
import PublicRoute from "./shared/components/PublicRoute";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import MainLayout from "./features/layouts/MainLayout";
import Home from "./features/home/components/Home";
import ProductList from "./features/products/product-list/components/ProductList";
import ProductDetail from "./features/products/product-detail/components/ProductDetail";
import Profile from "./features/profile/components/Profile";
import PublicLayout from "./features/layouts/PublicLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes — no layout */}
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      {/* Protected routes — shared layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/profile/" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
