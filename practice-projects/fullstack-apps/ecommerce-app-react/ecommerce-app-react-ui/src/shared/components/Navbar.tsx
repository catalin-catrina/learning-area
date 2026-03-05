import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <div className={styles.navListLeft}>
          <li className={styles.navItem}>
            <NavLink to="/products" className={styles.navLink}>
              Products
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/products/create" className={styles.navLink}>
              Create New
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/products/edit" className={styles.navLink}>
              Edit Product
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/orders" className={styles.navLink}>
              Orders
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/users" className={styles.navLink}>
              Users
            </NavLink>
          </li>
        </div>

        <div className={styles.navListRight}>
          <li className={styles.navItem}>
            <NavLink to="/login" className={styles.navLink}>
              Login
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/register" className={styles.navLink}>
              Register
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
