import { useState, useEffect } from "react";

interface Teacher {
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
        setTeachers(data);
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
        {teachers.map((teacher, index) => (
          <li key={index}>
            <div>ユーザー名: {teacher.username}</div>
            <div>メールアドレス: {teacher.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherList;
