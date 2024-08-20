import React, { useState } from "react";

const DepartmentRegister = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [years, setYears] = useState("");

  const handleDepartmentNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartmentName(e.target.value);
  };

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYears(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/department/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: departmentName, years }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Handle success
        console.log("Department registered successfully");
      } else {
        // Handle error
        console.error("Failed to register department");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div>
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
};

export default DepartmentRegister;
