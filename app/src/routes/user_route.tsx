import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import UserLogin from "../components/user_login";
import UserPasswordReset from "../components/user_password_reset";
import UserPasswordChange from "../components/user_password_change";
import ProductList from "../components/product_list";
import UserTop from "../components/user_top";
import UserRegister from "../components/user_register";
import QrReading from "../components/qr_reading";
import ReturnRequest from "../components/return_request";
import LendingRequest from "../components/lending_request";
import ProtectedRoute from "./ProtectedRoute";

function UserRoute() {
  return (
    <div>
      <Routes>
        {/* ユーザーログイン画面*/}
        <Route path="/user_login" element={<UserLogin />} />
        {/* ユーザー登録画面*/}
        <Route path="/user_register" element={<UserRegister />} />
        {/*ユーザーパスワード変更メール送信画面 */}
        <Route path="/user_password_reset" element={<UserPasswordReset />} />
        {/*ユーザーパスワード変更画面 */}
        <Route path="/user_password_change" element={<UserPasswordChange />} />
        {/*備品一覧*/}
        <Route
          path="/product_list"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        {/* ユーザートップ画面 */}
        <Route
          path="/user_top"
          element={
            <ProtectedRoute>
              <UserTop />
            </ProtectedRoute>
          }
        />
        {/*QR読み込み画面 */}
        <Route
          path="/qr_reading"
          element={
            <ProtectedRoute>
              <QrReading />
            </ProtectedRoute>
          }
        />
        {/*返却申請画面*/}
        <Route
          path="/return_request"
          element={
            <ProtectedRoute>
              <ReturnRequest />
            </ProtectedRoute>
          }
        />
        {/*貸出申請画面*/}
        <Route
          path="/lending_request"
          element={
            <ProtectedRoute>
              <LendingRequest />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default UserRoute;
