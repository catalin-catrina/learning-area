import styles from "./App.module.css";
import AppRoutes from "./routes";
import { AuthProvider } from "./shared/context/auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div className={styles.container}>
        <div className={styles.content}>
          <AppRoutes />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
