import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

interface FormInputs {
  email: string;
}

function UserPasswordReset() {
  const [errorFlg, setErrorFlg] = React.useState(false);
  const [mail, setMail] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  //エラーじゃないときにしか動作しない
  const onSubmit = (data: FormInputs) => {
    setMail(data.email);
  };
  const onError = (errors: Object) => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      setErrorFlg(true);
    } else {
      setErrorFlg(false);
    }
  };
  return (
    <div>
      <p>パスワード変更用メール</p>
    </div>
  );
}

export default UserPasswordReset;
