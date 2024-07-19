import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import UserLogin from "../components/user_login";
import UserPasswordReset from "../components/user_password_reset";
import UserPasswordChange from "../components/user_password_change";
import ProductList from "../components/product_list";
import UserTop from "../components/user_top";

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
        {/*備品一覧*/}
        <Route path="/user_top" element={<ProductList />} />
        {/* ユーザートップ画面 */}
        <Route path="/user_password_change" element={<UserTop />} />
      </Routes>
    </div>
  );
}

export default UserRoute;
