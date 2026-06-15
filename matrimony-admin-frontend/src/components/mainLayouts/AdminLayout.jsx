import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    const adminToken = localStorage.getItem("adminToken");
    
    if ((!adminId || !adminToken) && location.pathname !== "/") {
      navigate("/", { replace: true });
    } else if (adminId && adminToken && location.pathname === "/") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate, location]);

  return <>{children}</>;
};

export default AdminLayout;
