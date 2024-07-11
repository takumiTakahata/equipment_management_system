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
  {
    value: "情報システム科",
    label: "情報システム科",
  },
  {
    value: "総合システム科",
    label: "総合システム科",
  },
  {
    value: "高度情報工学科",
    label: "高度情報工学科",
  },
];

const grade = [
  {
    value: "1年",
    label: "1年",
  },
  {
    value: "2年",
    label: "2年",
  },
  {
    value: "3年",
    label: "3年",
  },
  {
    value: "4年",
    label: "4年",
  },
];
