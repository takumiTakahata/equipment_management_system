import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import UserLogin from "../components/user_login";
import UserPasswordReset from "../components/user_password_reset";
import UserPasswordChange from "../components/user_password_change";

function UserRoute() {
  return (
    <div>
      <Routes>
        {/* ユーザーログイン画面*/}
        <Route path="/user_login" element={<UserLogin />} />
        {/*ユーザーパスワード変更メール送信画面 */}
        <Route path="/user_password_reset" element={<UserPasswordReset />} />
        {/*ユーザーパスワード変更画面 */}
        <Route path="/user_password_change" element={<UserPasswordChange />} />
      </Routes>
    </div>
  );
}

export default UserRoute;
