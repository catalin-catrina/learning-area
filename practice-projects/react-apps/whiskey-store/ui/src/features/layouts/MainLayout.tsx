import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className="w-full max-w-350 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
