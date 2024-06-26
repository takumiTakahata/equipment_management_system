import * as React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "@mui/material";
import Header from "./header";

function TeacherRegister() {
  return (
    <div>
      <Header />
      <h1>教員登録</h1>
    </div>
  );
}

export default TeacherRegister;
