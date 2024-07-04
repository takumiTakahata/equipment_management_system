import * as React from "react";
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
  const [showPassword, setShowPassword] = React.useState(false);
  //確認用パスワード
  const [showPassword_C, setShowPassword_C] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //確認用パスワード
  const handleClickShowPassword_C = () => setShowPassword_C((show) => !show);
  const handleMouseDownPassword_C = (
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
    console.log(data);
  };

  const password = watch("password");
  return (
    <div id="teacher_register">
      <Header />
      <h1 className="title">教員登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="column">
            <div className="name_container">
              <p className="name_title">名前</p>
              <p className="required_txt">※必須</p>
            </div>
            <TextField
              {...register("name", {
                required: "名前を入力してください",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              as="p"
              className="error_message"
            />
          </div>
          <div className="column">
            <div className="eamil_container">
              <p className="mail_title">メールアドレス</p>
              <p className="required_txt">※必須</p>
            </div>
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
        </div>
        <div className="flex">
          <div className="column">
            <div className="pass_container">
              <p>パスワード（8文字以上 半角英数字）</p>
              <p className="required_txt">※必須</p>
            </div>
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
                  value: /^(?=.*[A-Z]|[a-z])(?=.*\d)[A-Za-z0-9]{8}$/, // 入力規則 8文字以上
                  message: "パスワードの形式が間違っています",
                },
              })}
              className="pass_title"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              as="p"
              className="error_message"
            />
          </div>

          <div className="column">
            <div className="passch_container">
              <p>パスワード（確認）</p>
              <p className="required_txt">※必須</p>
            </div>
            <OutlinedInput
              id="outlined-adornment-password_c"
              type={showPassword_C ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword_C}
                    onMouseDown={handleMouseDownPassword_C}
                    edge="end"
                  >
                    {showPassword_C ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              {...register("check_password", {
                required: "パスワード（確認用）を入力してください",
                validate: (value) => {
                  return value === password || "パスワードが間違がっています";
                },
              })}
              className="passch_title"
            />
            <ErrorMessage
              errors={errors}
              name="check_password"
              as="p"
              className="error_message"
            />
          </div>
        </div>
        <Button type="submit">登録</Button>
      </form>
    </div>
  );
}

export default TeacherRegister;
