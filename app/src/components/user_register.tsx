import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DialogActions, InputLabel, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material";
import "./user_register.css";

const subject = [
  { value: "0", label: "情報システム科" },
  { value: "1", label: "総合システム科" },
  { value: "2", label: "高度情報工学科" },
];

const grade = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

interface FormInputs {
  name: string;
  email: string;
  password: string;
  check_password: string;
  subject: string;
  grade: string;
}

const handleMouseDownPassword = (
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
};

function UserRegister() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorFlg, setErrorFlg] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [selectSubject, setSelectSubject] = React.useState("0");
  const [selectGrade, setSelectGrade] = React.useState("1");

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectSubject(event.target.value);
  };
  const getSubjectLabel = (value: string) => {
    const selectedOption = subject.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : "";
  };
  const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectGrade(event.target.value);
  };
  const getGradeLabel = (value: string) => {
    const selectedOption = grade.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : "";
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const password = watch("password");
  //エラーじゃないときにしか動作しない
  const onSubmit = (data: FormInputs) => {
    setOpen(true);
    setName(data.name);
    setMail(data.email);
    FetchRegister(data.name, data.email, data.password);
  };
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

  async function FetchRegister(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/teacher/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div className="user_register">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="name_input">
          <TextField
            className="name_txt"
            label="名前"
            id="outlined-basic"
            variant="outlined" //フィールドのスタイルを変更
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
        <div className="email_input">
          <TextField
            className="email_txt"
            id="outlined-basic"
            label="メールアドレス"
            variant="outlined"
            {...register("email", {
              required: "メールアドレスを入力してください",
              pattern: {
                value: /[a-zA-Z0-9.]+@morijyobi.ac.jp$/,
                message: "盛ジョビのメールアドレスを入力してください",
              },
            })}
          />
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
      </form>
    </div>
  );
}
