import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TextField } from "@mui/material";
import OutlinedInput from "@mui/material";
import InputAdornment from "@mui/material";
import IconButton from "@mui/material";
import Visibility from "@mui/icons-material";
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
      </form>
    </div>
  );
}
