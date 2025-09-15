import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <main className="flex-grow p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
