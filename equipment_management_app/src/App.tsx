import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TeacherRegister from "./components/teacher_register";
import UserRoute from "./routes/user_route";
import AdminRoute from "./routes/admin_route";
import Login from "./components/login";

const App = () => {
  return (
    <>
      <TeacherRegister />
      <Login />
      <Router>
        <UserRoute />
        <AdminRoute />
      </Router>
    </>
  );
};

export default App;
