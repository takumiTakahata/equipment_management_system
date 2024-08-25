import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DepartmentEdit = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const departmentId = queryParams.get("id");
  const departmentName = queryParams.get("name");
  const departmentYears = queryParams.get("years");

  const [name, setName] = useState(departmentName || "");
  const [years, setYears] = useState(departmentYears || "");

  useEffect(() => {
    if (departmentName) {
      setName(departmentName);
    }
    if (departmentYears) {
      setYears(departmentYears);
    }
  }, [departmentName, departmentYears]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleYearsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYears(event.target.value);
  };
  // 学科削除
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://mysite-mczi.onrender.com/api/department/${departmentId}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("削除成功:", data);
      } else {
        console.error("削除失敗:", response.statusText);
      }
    } catch (error) {
      console.error("削除失敗:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://mysite-mczi.onrender.com/api/department/${departmentId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, course_year: years }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update department");
      }

      const data = await response.json();
      console.log("Department updated successfully:", data);
    } catch (error) {
      console.error("An error occurred while updating the department", error);
    }
  };

  return (
    <div>
      <h2>学科編集</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>学科名: </label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>年数: </label>
          <input type="text" value={years} onChange={handleYearsChange} />
        </div>
        <button type="submit">編集</button>
      </form>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
};

export default DepartmentEdit;
