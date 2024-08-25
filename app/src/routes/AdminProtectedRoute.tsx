import { jwtDecode, JwtPayload } from "jwt-decode";
import React, { useEffect, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  isAdminRoute?: boolean; // 管理者専用ルートの場合のフラグ
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAdminRoute = false,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        // トークンがない場合、ログインページにリダイレクト
        navigate("/admin_login");
        return;
      }

      if (isAdminRoute) {
        try {
          const userId = jwtDecode<JwtPayload & { user_id?: string }>(token);
          const response = await fetch(
            `https://mysite-mczi.onrender.com/api/teacher/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (data.admin_flag) {
            setHasPermission(true);
          } else {
            setHasPermission(false);
            navigate("/admin_login"); // 権限がない場合のリダイレクト先
            return;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/admin_login"); // エラー発生時のリダイレクト先
          return;
        }
      } else {
        setHasPermission(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate, isAdminRoute]);

  if (loading) {
    return <div>Loading...</div>; // ローディング状態の表示
  }

  return <>{hasPermission ? children : null}</>;
};

export default ProtectedRoute;
