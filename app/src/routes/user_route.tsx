import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import UserLogin from "../components/user_login";
import UserPasswordReset from "../components/user_password_reset";
import UserPasswordChange from "../components/user_password_change";
import ProductList from "../components/product_list";
import UserTop from "../components/user_top";
import QrReading from "../components/qr_reading";
import ReturnRequest from "../components/return_request";
import LendingRequest from "../components/lending_request";

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
        <Route path="/product_list" element={<ProductList />} />
        {/* ユーザートップ画面 */}
        <Route path="/user_top" element={<UserTop />} />
        {/*QR読み込み画面 */}
        <Route path="/qr_reading" element={<QrReading />} />
        {/*返却申請画面*/}
        <Route path="/return_request" element={<ReturnRequest />} />
        {/*貸出申請画面*/}
        <Route path="/lending_request" element={<LendingRequest />} />
      </Routes>
    </div>
  );
}

export default UserRoute;
