import { Route, Routes } from "react-router";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import Products from "./features/products/components/Products";
import ProductsList from "./features/products/components/ProductsList";
import CreateProduct from "./features/products/components/CreateProduct";
import EditProduct from "./features/products/components/EditProduct";
import Product from "./features/products/components/Product";
import PublicRoute from "./shared/components/PublicRoute";
import ProtectedRoute from "./shared/components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProductsList />} />
        <Route path="create" element={<CreateProduct />} />
        <Route path="edit" element={<EditProduct />} />
        <Route path=":id" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
