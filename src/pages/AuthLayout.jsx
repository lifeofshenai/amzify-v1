import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      if (user?.userType === "ADMIN") {
        navigate("/vendors");
      } else {
        navigate("/dashboard");
      }
    }
  }, [token]);
  return <Outlet />;
};
export default Auth;
