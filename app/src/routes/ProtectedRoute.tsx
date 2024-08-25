import React, { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      // トークンがない場合、ログインページにリダイレクト
      navigate("/user_login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
