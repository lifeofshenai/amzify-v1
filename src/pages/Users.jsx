import React, { useEffect } from "react";
import { Search } from "lucide-react";
import { GetUsers } from "../redux/slices/admin";
import UserList from "../components/users/UserList";

import { useDispatch, useSelector } from "react-redux";

export default function Users() {
  const dispatch = useDispatch();
  const { isLoading, users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(GetUsers());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search email/name/company..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <UserList users={users} />
    </div>
  );
}
