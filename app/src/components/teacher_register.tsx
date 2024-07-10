import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Header from "./header";
import "./teacher_register.css";

interface FormInputs {
  name: string;
  mail: string;
  password: string;
  check_password: string; //パスワード（確認用）
}

function TeacherRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorFlg, setErrorFlg] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    //  エラーじゃないときしかとれない
    console.log(data);
  };

  const onError = (errors: Object) => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      setErrorFlg(true);
    } else {
      setErrorFlg(false);
    }
  };

  const password = watch("password");
  return (
    <div id="teacher_register">
      <Header />
      <div className="center">
        <h1 className="page_title">教員登録</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="name_input">
            <TextField
              label="名前"
              variant="outlined"
              {...register("name", {
                required: "名前を入力してください",
              })}
            />
            {errorFlg ? (
              <ErrorMessage
                errors={errors}
                name="name"
                as="p"
                className="error_message"
              />
            ) : (
              <p className="required_txt">※必須</p>
            )}
          </div>
          <div className="eamil_container">
            <p className="mail_title">メールアドレス</p>
            <p className="required_txt">※必須</p>
          </div>
          <div className="mail_input">
            <TextField
              {...register("mail", {
                required: "メールアドレスを入力してください",
                pattern: {
                  value: /^[a-zA-Z0-9.]+@morijyobi\.ac\.jp$/,
                  message: "盛ジョビのメールアドレスを入力してください",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="mail"
              as="p"
              className="error_message"
            />
          </div>

          <div className="pass_container">
            <p className="pass_title">パスワード（8文字以上 半角英数字）</p>
            <p className="required_txt">※必須</p>
          </div>
          <div className="pass_input">
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              {...register("password", {
                required: "パスワードを入力してください",
                pattern: {
                  value: /^(?=.*[A-Z]|[a-z])(?=.*\d)[A-Za-z0-9]{8,}$/, // 入力規則 8文字以上
                  message: "パスワードの形式が間違っています",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              as="p"
              className="error_message"
            />
          </div>

          <div className="passch_container">
            <p className="passch_title">パスワード（確認）</p>
            <p className="required_txt">※必須</p>
          </div>
          <div className="passch_input">
            <OutlinedInput
              id="outlined-adornment-password_c"
              type="password"
              {...register("check_password", {
                required: "パスワード（確認用）を入力してください",
                validate: (value) => {
                  return value === password || "パスワードが間違がっています";
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="check_password"
              as="p"
              className="error_message"
            />
          </div>
          <Button type="submit">登録</Button>
        </form>
      </div>
    </div>
  );
}

export default TeacherRegister;
