import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate(); // useNavigate フックを使用して、画面遷移を行う

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.]+@morijyobi\.ac\.jp$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.[A-Z]|[a-z]|[0-9])(?=.\d)[A-Za-z0-9]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("メールアドレスの形式が間違っています");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "パスワードは8文字以上で、少なくとも1つの英字と1つの数字を含める必要があります"
      );
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch("http://localhost:8000/api/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        console.log("Login successful");

        // ログイン成功後に遷移
        navigate("/user_top");
      } else {
        const errorData = await response.json();
        setError(errorData.non_field_errors || "Login failed");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Error:", error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="user_login">
      <h2 className="page_title">ログイン</h2>
      <div className="user_login_email">
        <TextField
          label="メールアドレス"
          type="email"
          className="user_login_email_text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
      </div>

      {!emailError && <p className="ad_login_required_txt">※必須</p>}

      <div className="user_login_pass">
        <TextField
          label="パスワード"
          type={showPassword ? "text" : "password"}
          className="user_login_pass_text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {!passwordError && (
        <p className="ad_login_required_txt">※必須（8文字以上 半角英数字）</p>
      )}
    </div>
  );
};

export default Login;
