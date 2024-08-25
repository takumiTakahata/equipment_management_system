import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Header from "./header";
import { useLocation } from "react-router-dom";

interface Course {
  id: number;
  name: string;
}

interface Student {
  id: number;
  username: string;
  email: string;
  course_id: string;
  school_year: string;
  course_name?: string;
}

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    if (message) {
      console.log(message);
      setTimeout(() => alert(message), 100);
    }

    // 学生情報を取得
    const fetchStudentsAndCourses = async () => {
      try {
        const response = await fetch(
          "https://mysite-mczi.onrender.com/api/student/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const studentsData = await response.json();

        // コース情報を取得
        const coursesResponse = await fetch(
          "https://mysite-mczi.onrender.com/api/department/"
        );
        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // コースIDとコース名の対応表を作成
        const courseMap = new Map(
          coursesData.map((course: Course) => [course.id, course.name])
        );

        // コース名を含む学生データのマッピング
        const studentsWithCourses = studentsData.map((student: Student) => ({
          ...student,
          course_name: courseMap.get(student.course_id) || "Unknown Course",
        }));

        // idでソート
        const sortedStudents = studentsWithCourses.sort(
          (a: Student, b: Student) => a.id - b.id
        );
        setStudents(sortedStudents);
      } catch (error) {
        console.error("An error occurred while fetching data", error);
      }
    };
    fetchStudentsAndCourses();
  }, []);

  const handleRowClick = (student: Student) => {
    navigate(`/student_edit/${student.id}`);
  };

  const uniqueSchoolYears = Array.from(
    new Set(students.map((student) => student.school_year).filter(Boolean))
  );

  return (
    <div>
      <Header />
      <h2>学生一覧</h2>
      <TextField select id="outlined-select-currency" defaultValue="学科">
        <MenuItem value="学科">学科</MenuItem>
        {courses.map((course) => (
          <MenuItem key={course.id} value={course.name}>
            {course.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField select id="outlined-select-currency" defaultValue="学年">
        <MenuItem value="学年">学年</MenuItem>
        {uniqueSchoolYears.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        placeholder="名前"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="outlined">検索</Button>
      <Paper elevation={0} sx={{ width: "70%", margin: "auto" }}>
        <TableContainer className="tablecontainer">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">名前</TableCell>
                <TableCell align="center">学科</TableCell>
                <TableCell align="center">学年</TableCell>
                <TableCell align="center">メールアドレス</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  onClick={() => handleRowClick(student)}
                >
                  <TableCell align="center">{student.username}</TableCell>
                  <TableCell align="center">{student.course_name}</TableCell>
                  <TableCell align="center">{student.school_year}</TableCell>
                  <TableCell align="center">{student.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default StudentList;
