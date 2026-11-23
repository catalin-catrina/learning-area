import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../shared/context/auth/AuthContext";

const ProfileLayout = () => {
  const { user } = useAuthContext();

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Salut {user?.name}</h1>
        <p>
          In sumar cont ai posibilitatea de a vizualiza activitatile recente...
        </p>
      </header>

      <div className="profile-body">
        <aside className="profile-sidebar">
          {/* 'end' ensures /profile isn't highlighted when on /profile/orders */}
          <NavLink to="/profile" end>
            My profile
          </NavLink>
          <NavLink to="/profile/orders">My orders</NavLink>
          <NavLink to="/profile/favorites">Favorites</NavLink>
          <NavLink to="/profile/addresses">Addresses</NavLink>
        </aside>

        <section className="profile-content">
          {/* Renders ProfileOverview, OrdersPage, or FavoritesPage here */}
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default ProfileLayout;
