import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <ul>
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
      </ul>
    </div>
  );
}

export default TeacherList;
