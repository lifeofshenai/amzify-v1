import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Header from "./Header";

export default function Layout() {
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || user?.userType !== "ADMIN") {
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <Header />
      <main className="ml-64 pt-16">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
