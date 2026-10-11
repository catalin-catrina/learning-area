import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { NavLink } from "react-router-dom";
import { IconButton, Paper, Popper } from "@mui/material";
import { useRef, useState } from "react";
import CartPreview from "../../features/cart/components/CartPreview";

function Navbar() {
  const { user, handleLogout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOpen = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLButtonElement>,
  ) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setAnchorEl(event.currentTarget);
  };

  const keepOpen = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const scheduleClose = () => {
    closeTimeout.current = setTimeout(() => {
      setAnchorEl(null);
      closeTimeout.current = null;
    }, 150);
  };

  const closePreview = () => {
    keepOpen();
    setAnchorEl(null);
  };

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
            <IconButton
              onMouseEnter={handleOpen}
              onMouseLeave={scheduleClose}
              onFocus={handleOpen}
              onBlur={scheduleClose}
              sx={{ color: "white" }}
              aria-label="Open cart preview"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={id}
            >
              <ShoppingCartIcon />
            </IconButton>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              placement="bottom-end"
            >
              <Paper onMouseEnter={keepOpen} onMouseLeave={scheduleClose}>
                <CartPreview onNavigate={closePreview} />
              </Paper>
            </Popper>
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
