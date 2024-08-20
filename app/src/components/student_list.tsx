import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    // 学生情報を取得
    const fetchStudentsAndCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/student/");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const studentsData = await response.json();

        // コース情報を取得
        const coursesResponse = await fetch(
          "http://127.0.0.1:8000/api/department/"
        );
        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }
        const coursesData = await coursesResponse.json();

        // Create a map of course IDs to course names
        const courseMap = new Map(
          coursesData.map((course: Course) => [course.id, course.name])
        );

        // Map student data to include course names
        const studentsWithCourses = studentsData.map((student: Student) => ({
          ...student,
          course_name: courseMap.get(student.course_id) || "Unknown Course",
        }));

        // Sort students by ID
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
              <p>学科: {student.course_name}</p>
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
