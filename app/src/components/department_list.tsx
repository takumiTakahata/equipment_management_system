import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface department {
  id: number;
  name: string;
  course_year: number;
}
const DepartmentList = () => {
  const [departments, setDepartments] = useState<department[]>([]);
  const navigate = useNavigate();

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
        setDepartments(data); // Update state with fetched departments
      } catch (error) {
        console.error("An error occurred while fetching departments", error);
      }
    };

    fetchDepartments(); // Call fetchDepartments when component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleRowClick = (department: department) => {
    navigate(
      `/department_edit?id=${department.id}&name=${encodeURIComponent(
        department.name
      )}&years=${department.course_year}`
    );
  };

  const departmentRegister = () => {
    navigate("/department_register");
  };

  return (
    <div>
      <h1>Department List</h1>
      <Button onClick={departmentRegister} variant="outlined">
        学科登録
      </Button>
      <Paper elevation={0} sx={{ width: "70%", margin: "auto" }}>
        <TableContainer className="tablecontainer">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">学科名</TableCell>
                <TableCell align="center">学年</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow
                  key={department.id}
                  onClick={() => handleRowClick(department)}
                >
                  <TableCell align="center">{department.name}</TableCell>
                  <TableCell align="center">{department.course_year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default DepartmentList;
