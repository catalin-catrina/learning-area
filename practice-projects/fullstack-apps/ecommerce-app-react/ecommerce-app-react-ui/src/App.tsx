import AppRoutes from "./routes";
import Navbar from "./shared/components/Navbar";
import styles from "./App.module.css";
import { AuthProvider } from "./shared/context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <AppRoutes />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
