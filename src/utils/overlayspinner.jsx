import React from "react";

function OverlaySpinner() {
  return (
    <div className="border-t mt-5 pt-3 flex justify-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default OverlaySpinner;
