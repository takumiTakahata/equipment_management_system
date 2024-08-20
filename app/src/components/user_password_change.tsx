import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { InputLabel } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import "./user_password_change.css";

interface FormInputs {
  password: string;
  check_password: string;
}

const handleMouseDownPassword = (
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
};

function UserPasswordChange() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorFlg, setErrorFlg] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const password = watch("password");
  //エラーじゃないときにしか動作しない
  const onSubmit = (data: FormInputs) => {};
  const onError = (errors: Object) => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      setErrorFlg(true);
    } else {
      setErrorFlg(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <div className="password_reset">
      <p className="title">パスワード変更</p>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="password_input">
          <FormControl variant="outlined" className="password_txt">
            <InputLabel htmlFor="outlined-pw">パスワード</InputLabel>
            <OutlinedInput
              id="outlined-pw"
              label="パスワード"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
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
                  message: "パスワードの形式が違います",
                },
              })}
            />
          </FormControl>
          {errorFlg ? (
            <ErrorMessage
              errors={errors}
              name="password"
              as="p"
              className="error_message"
            />
          ) : (
            <p className="required_txt">※必須（8文字以上 半角英数字）</p>
          )}
        </div>
        <div className="pwconf_input">
          <FormControl variant="outlined" className="pwconf_txt">
            <InputLabel>パスワード(確認用)</InputLabel>
            <OutlinedInput
              id="outlined-pw"
              type="password"
              {...register("check_password", {
                required: "パスワード（確認用）を入力してください",
                validate: (value) => {
                  return value === password || "パスワードが間違っています";
                },
              })}
              label="パスワード確認用"
            />
          </FormControl>
          {errorFlg ? (
            <ErrorMessage
              errors={errors}
              name="check_password"
              as="p"
              className="error_message"
            />
          ) : (
            <p className="required_txt">※必須</p>
          )}
        </div>
        <div className="send_button">
          <Button className="button" variant="contained" color="primary">
            変更
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserPasswordChange;
