import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Button from "@mui/material/Button";
import Header from "./header";

interface FormInputs {
  department_name: string;
  years: string;
}

function DepartmentRegister() {
  const [departmentName, setDepartmentName] = useState("");
  const [errorFlg, setErrorFlg] = useState(false);

  const [years, setYears] = useState("");

  const handleDepartmentNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartmentName(e.target.value);
  };
  //エラーじゃないときにしか動作しない
  const onSubmit = (data: FormInputs) => {
    setDepartmentName(data.department_name);
    setYears(data.years);
  };
  const {
    register,
    formState: { errors },
  } = useForm<FormInputs>();

  //validationエラーが出た時
  const onError = (errors: Object) => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      setErrorFlg(true);
    } else {
      setErrorFlg(false);
    }
  };

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYears(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/department/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: departmentName,
          course_year: years,
          delete_flag: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to register department: ${errorText}`);
      }

      const data = await response.json();
      console.log("Department registered successfully:", data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div id="department_register">
      <Header />
      <h1 className="page_title">学科登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="学科名"
            className="department_input_text"
            variant="outlined"
            {...register("department_name", {
              required: "学科名を入力してください",
            })}
            onChange={handleDepartmentNameChange}
          />
        </div>
        {errorFlg ? (
          <ErrorMessage
            errors={errors}
            name="department_name"
            as="p"
            className="error_message"
          />
        ) : (
          <p className="required_txt">※必須</p>
        )}
        <div>
          <TextField
            label="年数"
            className="years_input_text"
            variant="outlined"
            {...register("years", {
              required: "年数を入力してください",
            })}
            onChange={handleYearsChange}
          />
        </div>
        {errorFlg ? (
          <ErrorMessage
            errors={errors}
            name="years"
            as="p"
            className="error_message"
          />
        ) : (
          <p className="required_txt">※必須</p>
        )}
        <Button type="submit" variant="contained" className="register_button">
          登録
        </Button>
      </form>
    </div>
  );
}

export default DepartmentRegister;
