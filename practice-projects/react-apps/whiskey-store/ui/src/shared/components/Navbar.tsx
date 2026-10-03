import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { user, handleLogout } = useAuth();

  function onLogout() {
    handleLogout();
  }

  return (
    <nav className="bg-gray-950 h-15 text-gray-100 p-2">
      {user ? (
        <div className="flex flex-row gap-3 justify-between">
          <ul className="nav-list flex flex-row gap-3">
            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <button onClick={() => onLogout()} className="nav-link">
                Logout
              </button>
            </li>
          </ul>
          <div className="cart">
            <ShoppingCartIcon></ShoppingCartIcon>
          </div>
        </div>
      ) : (
        ""
      )}

      {!user ? (
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        </ul>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navbar;
