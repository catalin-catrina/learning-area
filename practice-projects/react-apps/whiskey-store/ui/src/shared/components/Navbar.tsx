import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { getToken } from "../services/tokenStore";

function Navbar() {
  const { token, user } = useAuth();
  const stateToken = getToken();
  console.log(`tokens in nav ${token} ${stateToken}`)
  return (
    <nav className="bg-gray-950 h-15 text-gray-100 p-2">
      {user ? (
        <div className="flex flex-row gap-3 justify-between">
          <ul className="nav-list flex flex-row gap-3">
            <li className="nav-item">
              <a href="/products" className="nav-link">
                Home
              </a>
              <a href="/logout" className="nav-link">
                Logout
              </a>
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
            <a href="/login" className="nav-link">
              Login
            </a>
          </li>
        </ul>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navbar;
