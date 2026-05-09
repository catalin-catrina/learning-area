import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="w-full max-w-350 mx-auto">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
