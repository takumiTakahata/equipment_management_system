import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import UserLogin from "../components/user_login";
import UserPasswordReset from "../components/user_password_reset";

function UserRoute() {
  return (
    <div>
      <Routes>
        {/* ユーザーログイン画面*/}
        <Route path="/user_login" element={<UserLogin />} />
        {/*ユーザー パスワードリセット画面 */}
        <Route path="/user_password_reset" element={<UserPasswordReset />} />
      </Routes>
    </div>
  );
}

export default UserRoute;
