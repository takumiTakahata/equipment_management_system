import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header"; // Headerコンポーネントをインポート
import TeacherRegister from "./components/teacher_register";
const App = () => {
  return (
    <>
      <TeacherRegister />
    </>
  );
};

export default App;
