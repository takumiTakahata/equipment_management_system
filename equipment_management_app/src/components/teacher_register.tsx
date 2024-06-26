import * as React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "@mui/material";
import Header from "./header";
import { log } from "console";

interface FormInputs {
  name_error: string;
  mail_error: string;
}

function TeacherRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };
  return (
    <div>
      <Header />
      <h1>教員登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>名前</p>
        <TextField
          {...register("name_error", {
            required: "名前を入力してください",
          })}
        />
        <ErrorMessage errors={errors} name="name_error" as="p" />
        <p>メールアドレス</p>
        <TextField />
        <p>パスワード</p>
        <TextField />
        <p>パスワード（確認）</p>
        <TextField />
        <Button type="submit">登録</Button>
      </form>
    </div>
  );
}

export default TeacherRegister;
