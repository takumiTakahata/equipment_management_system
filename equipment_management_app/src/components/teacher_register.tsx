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
      <form>
        <p>名前</p>
        <TextField />
        <p>メールアドレス</p>
        <TextField />
        <p>パスワード</p>
        <TextField />
        <p>パスワード（確認）</p>
        <TextField />
        <Button variant="contained" href="#">
          登録
        </Button>
      </form>
    </div>
  );
}

export default TeacherRegister;
