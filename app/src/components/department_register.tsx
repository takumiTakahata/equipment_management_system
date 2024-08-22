import React, { useState } from "react";
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
    <div>
      <Header />
      <h1 className="page_title">学科登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="department_name">学科名</label>
          <input
            type="text"
            id="department_name"
            value={departmentName}
            onChange={handleDepartmentNameChange}
          />
        </div>
        <div>
          <label htmlFor="years">年数</label>
          <input
            type="text"
            id="years"
            value={years}
            onChange={handleYearsChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default DepartmentRegister;
