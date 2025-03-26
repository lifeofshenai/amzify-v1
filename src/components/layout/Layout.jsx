import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || user?.userType !== "USER") {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar and Header Hidden on Mobile */}
      <div className="dashboard">
        <Sidebar />
        <Header />
      </div>

      {/* Main content hidden on mobile */}
      <main className="ml-64 pt-16 hidden md:block">
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Only Show Logout Button on Mobile */}
      <div className="fixed inset-0 flex flex-col items-center justify-center text-center bg-gray-100 md:hidden">
        <p className="text-gray-500 text-lg mb-6 px-6">
          Our platform is currently unavailable on mobile. Please switch to a desktop for the best experience.
        </p>
        <button
  onClick={() => navigate("/logout")}
  className="px-4 py-2 text-sm font-medium text-white bg-[#FF006B] rounded-lg hover:bg-[#d9005b]"
>
  Logout
</button>

      </div>
    </div>
  );
}
