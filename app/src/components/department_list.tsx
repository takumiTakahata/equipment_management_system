import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface department {
  id: number;
  name: string;
  course_year: number;
}
const DepartmentList = () => {
  const [departments, setDepartments] = useState<department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/department/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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

  return (
    <div>
      <h1>Department List</h1>
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
                <TableRow key={department.id}>
                  <TableCell align="center">{department.name}</TableCell>
                  <TableCell align="center">{department.course_year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* <ul>
        {departments.map((department) => (
          <li key={department.id}>
            <Link
              to={`/department_edit?id=${
                department.id
              }&name=${encodeURIComponent(department.name)}&years=${
                department.course_year
              }`}
            >
              {department.name}
              {department.course_year}
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default DepartmentList;
