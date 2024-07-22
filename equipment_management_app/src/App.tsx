import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserRoute from "./routes/user_route";
import AdminRoute from "./routes/admin_route";

const App = () => {
  return (
    <>
      <Router>
        <UserRoute />
        <AdminRoute />
      </Router>
    </>
  );
};

export default App;
