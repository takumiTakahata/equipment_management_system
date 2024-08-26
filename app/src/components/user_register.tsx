import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DialogActions, InputLabel, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./user_register.css";
import { School } from "@mui/icons-material";

interface Department {
  id: string;
  name: string;
  course_year: string;
}
interface FormInputs {
  username: string;
  email: string;
  password: string;
  check_password: string;
  school_year: string;
  course_id: string;
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
  const [username, setName] = React.useState("");
  const [email, setMail] = React.useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [school_year, setSchoolYear] = React.useState(0);
  const [course_id, setCourseId] = React.useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [selectedSchoolYear, setSelectedSchoolYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [schoolYears, setSchoolYears] = useState<number[]>([]);
  const navigate = useNavigate();

  // 学科情報を取得する
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          "https://mysite-mczi.onrender.com/api/department/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }

        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("An error occurred while fetching departments", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleCourseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCourseId = event.target.value;
    const selectedDepartment = departments.find(
      (department) => department.id === selectedCourseId
    );
    setSelectedDepartment(selectedDepartment || null);

    // 選択された学科に応じて学年の選択肢を更新する
    if (selectedDepartment) {
      const years = Array.from(
        { length: parseInt(selectedDepartment.course_year, 10) },
        (_, i) => i + 1
      );
      setSchoolYears(years);
    } else {
      setSchoolYears([]);
    }
  };

  const handleSchoolYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedSchoolYear(event.target.value);
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
    const selectedDepartment = departments.find(
      (department) => department.id === data.course_id
    );
    setOpen(true);
    setName(data.username);
    setMail(data.email);
    setSelectedCourseName(selectedDepartment ? selectedDepartment.name : "");
    setSelectedSchoolYear(data.school_year);
    setSchoolYear(Number(data.school_year));
    setCourseId(data.course_id);
  };
  const onError = (errors: Object) => {
    if (Object.keys(errors).length > 0) {
      setErrorFlg(true);
    } else {
      setErrorFlg(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const studentRegister = () => {
    FetchRegister(username, email, password, course_id, school_year);
    navigate("/user_login");
  };

  async function FetchRegister(
    username: string,
    email: string,
    password: string,
    course_id: string,
    school_year: number
  ): Promise<void> {
    try {
      const response = await fetch(
        `https://mysite-mczi.onrender.com/api/student/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            course_id,
            school_year: school_year,
          }),
        }
      );

      const data = await response.json();
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div id="student_register">
      <div className="center">
        <h1 className="page_title">学生登録</h1>
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

          {/* 学科選択 */}
          <div className="curse_container">
            <div className="curse_input">
              <TextField
                select
                label="学科"
                className="curse_input_text"
                variant="outlined"
                value={selectedDepartment ? selectedDepartment.id : ""}
                {...register("course_id", {
                  required: "学科を選択してください",
                })}
                onChange={handleCourseChange}
              >
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>

          {/* 学年選択 */}
          <div className="school_year_container">
            <div className="school_year_input">
              <TextField
                select
                label="学年"
                className="school_year_input_text"
                variant="outlined"
                value={selectedSchoolYear}
                {...register("school_year", {
                  required: "学年を選択してください",
                })}
                onChange={handleSchoolYearChange}
              >
                {schoolYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </div>
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
        </DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          学科
        </DialogContentText>
        <p className="log_value">{selectedCourseName}</p>
        <DialogContentText id="alert-dialog-slide-description">
          学年
        </DialogContentText>
        <p className="log_value">{selectedSchoolYear}</p>
        <DialogActions className="popup_button">
          <Button
            onClick={handleClose}
            className="popup_return_button"
            variant="contained"
          >
            戻る
          </Button>
          <Button
            onClick={studentRegister}
            className="popup_register_button"
            variant="contained"
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserRegister;
