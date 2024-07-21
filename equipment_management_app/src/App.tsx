import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TeacherRegister from "./components/teacher_register";
import UserRoute from "./routes/user_route";
import AdminRoute from "./routes/admin_route";

const App = () => {
  return (
    <>
      <TeacherRegister />
      <Router>
        <UserRoute />
        <AdminRoute />
      </Router>
    </>
  );
};

export default App;
