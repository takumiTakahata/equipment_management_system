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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Header from "./header";
import "./teacher_register.css";

interface FormInputs {
  username: string;
  email: string;
  password: string;
  check_password: string; //パスワード（確認用）
}

function TeacherRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorFlg, setErrorFlg] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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

  //エラーじゃないときにしか動作しない
  const onSubmit = (data: FormInputs) => {
    setOpen(true);
    setUsername(data.username);
    setEmail(data.email);
  };

  //validationエラーが出た時
  const onError = (errors: Object) => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      setErrorFlg(true);
    } else {
      setErrorFlg(false);
    }
  };

  //popupを閉じる
  const handleClose = () => {
    setOpen(false);
  };

  const teacherRegister = () => {
    FetchRegister(username, email, password);
  };

  const password = watch("password");

  async function FetchRegister(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/teacher/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div id="teacher_register">
      <Header />
      <div className="center">
        <h1 className="page_title">教員登録</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="username_container">
            <div className="username_input">
              <TextField
                label="名前"
                className="username_input_text"
                variant="outlined"
                {...register("username", {
                  required: "名前を入力してください",
                })}
              />
            </div>
            {errorFlg ? (
              <ErrorMessage
                errors={errors}
                name="username"
                as="p"
                className="error_message"
              />
            ) : (
              <p className="required_txt">※必須</p>
            )}
          </div>
          <div className="email_container">
            <div className="email_input">
              <TextField
                label="メールアドレス"
                className="email_input_text"
                variant="outlined"
                {...register("email", {
                  required: "メールアドレスを入力してください",
                  pattern: {
                    value: /^[a-zA-Z0-9.]+@morijyobi\.ac\.jp$/,
                    message: "盛ジョビのメールアドレスを入力してください",
                  },
                })}
              />
            </div>

            {errorFlg ? (
              <ErrorMessage
                errors={errors}
                name="email"
                as="p"
                className="error_message"
              />
            ) : (
              <p className="required_txt">※必須</p>
            )}
          </div>

          <div className="pass_container">
            <div className="pass_input">
              <FormControl variant="outlined" className="pass_input_text">
                <InputLabel>パスワード</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  label="パスワード"
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
              </FormControl>
            </div>
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

          <div className="passch_container">
            <div className="passch_input">
              <FormControl variant="outlined" className="passch_input_text">
                <InputLabel>パスワード（確認）</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password_c"
                  label="パスワード（確認）"
                  type="password"
                  {...register("check_password", {
                    required: "パスワード（確認用）を入力してください",
                    validate: (value) => {
                      return (
                        value === password || "パスワードが間違がっています"
                      );
                    },
                  })}
                />
              </FormControl>
            </div>
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
          <Button type="submit" variant="contained" className="register_button">
            登録
          </Button>
        </form>
      </div>
      <Dialog
        open={open}
        aria-describedby="alert-dialog-slide-description"
        onClose={handleClose}
        className="popup"
      >
        <DialogTitle className="popup_title">
          入力された項目が正しいか確認してください
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            名前
          </DialogContentText>
          <p className="popup_text">{username}</p>
          <DialogContentText id="alert-dialog-slide-description">
            メールアドレス
          </DialogContentText>
          <p className="popup_text">{email}</p>
          <DialogContentText id="alert-dialog-slide-description">
            役割
          </DialogContentText>
          <p className="popup_text">常勤</p>
          <DialogActions className="popup_button">
            <Button onClick={handleClose} className="popup_return_button">
              戻る
            </Button>
            <Button onClick={teacherRegister} className="popup_register_button">
              登録
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TeacherRegister;
