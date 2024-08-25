import { jwtDecode, JwtPayload } from "jwt-decode";

const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("access_token");
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload & { user_id?: string }>(token);
      return decoded.user_id || null;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }
  return null;
};
