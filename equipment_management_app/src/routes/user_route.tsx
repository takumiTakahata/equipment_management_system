import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import UserLogin from "../components/user_login";

function UserRoute() {
  return (
    <div>
      <Routes>
        {/* ユーザーログイン画面*/}
        <Route path="/user_login" element={<UserLogin />} />
      </Routes>
    </div>
  );
}

export default UserRoute;
