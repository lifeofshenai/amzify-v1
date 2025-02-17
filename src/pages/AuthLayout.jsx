import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  console.log("🚀 ~ Auth ~ token:", token)
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);
  return <Outlet />;
};
export default Auth;
