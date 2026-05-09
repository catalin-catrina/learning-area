import AppRoutes from "./routes";
import { AuthProvider } from "./shared/context/auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
