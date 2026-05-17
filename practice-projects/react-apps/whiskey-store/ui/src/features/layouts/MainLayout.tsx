import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full max-w-350 mx-auto">
      <Outlet />
    </div>
  );
};

export default MainLayout;
