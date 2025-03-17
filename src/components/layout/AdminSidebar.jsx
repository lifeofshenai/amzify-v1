import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package2,
  Store,
  Megaphone,
  HeadphonesIcon,
  Wallet,
  Calculator,
  Video,
  Users,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";

import { Logout } from "../../redux/slices/auth";
import Logo from "../../assets/amzify-logo.png";

const menuItems = [{ label: "Vendors", icon: "Package2", path: "/vendors" }];

const iconComponents = {
  LayoutDashboard,
  Package2,
  Store,
  Megaphone,
  HeadphonesIcon,
  Wallet,
  Calculator,
  Video,
  Users,
};

export default function Sidebar() {
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(Logout());
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <img className="dash-logo" src={Logo} />
      </div>

      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = iconComponents[item.icon];
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <button
          onClick={onClickLogout}
          className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg w-full"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
