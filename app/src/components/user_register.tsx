import * as React from "react";
import { useState } from "react";
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
