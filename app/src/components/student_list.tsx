import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Student {
  id: number;
  username: string;
  email: string;
  course_id: string;
  school_year: string;
  course_name?: string;
}

function StudentList() {
  const [students, setStudens] = useState<Student[]>([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/student/");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        // idでソートする
        console.log(data);
        const sortedData = data.sort((a: Student, b: Student) => a.id - b.id);
        setStudens(sortedData);
      } catch (error) {
        console.error("An error occurred while fetching students", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>学生一覧</h2>
      <ul>
        {students.map((student) => (
          <Link
            to={`/student_edit/${student.id}`}
            key={student.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li>
              <div>ユーザー名: {student.username}</div>
              <p>学科: {student.course}</p>
              <p>学年: {student.school_year}</p>
              <div>メールアドレス: {student.email}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
