import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

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
    <div className="mail_send">
      <p className="title">パスワード変更用メール</p>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mail_txt">
          <TextField
            id="outlined-basic"
            label="メールアドレス"
            variant="outlined"
            className="email"
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
      </form>
    </div>
  );
}

export default UserPasswordReset;
