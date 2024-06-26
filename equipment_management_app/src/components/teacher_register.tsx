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

interface FormInputs {
  name_error: string;
  mail_error: string;
  password_error: string;
  c_password_error: string; //確認用パスワードのエラーメッセージ
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
        <TextField
          {...register("mail_error", {
            required: "メールアドレスを入力してください",
            pattern: {
              value: /[a-zA-Z0-9.]@morijyobi.ac.jp$/,
              message: "盛ジョビのメールアドレスを入力してください",
            },
          })}
        />
        <ErrorMessage errors={errors} name="mail_error" as="p" />
        <p>パスワード</p>
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
        />
        <p>パスワード（確認）</p>
        <OutlinedInput
          id="outlined-adornment-password"
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
        />
        <Button type="submit">登録</Button>
      </form>
    </div>
  );
}

export default TeacherRegister;
