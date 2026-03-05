import AppRoutes from "./routes";
import Navbar from "./shared/components/Navbar";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
