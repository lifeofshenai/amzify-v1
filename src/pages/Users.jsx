import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { GetUsers } from "../redux/slices/admin";
import UserList from "../components/users/UserList";
import ReactPaginate from "react-paginate";
import OverlaySpinner from "../utils/overlayspinner.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function Users() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;

  const { isLoading, users, usersCount } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(GetUsers({ pageNo: currentPage + 1, perPage }));
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <OverlaySpinner />
    </div>
  ) : (
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
      {/* Pagination Component */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(usersCount / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination flex justify-end space-x-2"}
        pageClassName={"border px-4 py-2 rounded"}
        activeClassName={"bg-[#FF006B] text-white"}
        previousClassName={"border px-4 py-2 rounded"}
        nextClassName={"border px-4 py-2 rounded"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
        forcePage={currentPage} // ✅ This will keep the selected page in sync
      />
    </div>
  );
}
