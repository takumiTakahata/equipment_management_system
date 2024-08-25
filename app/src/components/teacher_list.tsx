import { useState, useEffect } from "react";
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

interface Teacher {
  id: number;
  username: string;
  email: string;
}

function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/teacher/");
        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }
        const data = await response.json();
        // idでソートする
        const sortedData = data.sort((a: Teacher, b: Teacher) => a.id - b.id);
        setTeachers(sortedData);
      } catch (error) {
        console.error("An error occurred while fetching teachers", error);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div>
      <h2>教員一覧</h2>
      <Paper elevation={0} sx={{ width: "70%", margin: "auto" }}>
        <TableContainer className="tablecontainer">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="table_txt">名前</TableCell>
                <TableCell className="table_txt">メールアドレス</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.username}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* <ul>
        {teachers.map((teacher) => (
          <Link
            to={`/teacher_edit/${teacher.id}`}
            key={teacher.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li>
              <div>ユーザー名: {teacher.username}</div>
              <div>メールアドレス: {teacher.email}</div>
            </li>
          </Link>
        ))}
      </ul> */}
    </div>
  );
}

export default TeacherList;
