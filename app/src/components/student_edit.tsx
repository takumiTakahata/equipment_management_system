import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Course {
  id: string;
  name: string;
  course_year: number;
}

function StudentEdit() {
  // URLパラメータからidを取得
  const { id } = useParams();
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState({
    username: "",
    email: "",
    course_id: "",
    school_year: "",
  });
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);

  // URLパラメータから取得したidをセット
  useEffect(() => {
    if (id) {
      setStudentId(id);
      fetchStudentData(id);
      fetchCourses();
    }
  }, [id]);

  // 学生情報を取得する関数
  const fetchStudentData = async (id: string) => {
    try {
      const response = await fetch(
        `https://mysite-mczi.onrender.com/api/student/${id}/`
      );
      if (response.ok) {
        const data = await response.json();
        setStudentData(data);
        console.log("学生情報の取得に成功しました:", data);
      } else {
        console.error("学生情報の取得に失敗しました:", response.statusText);
      }
    } catch (error) {
      console.error("学生情報の取得に失敗しました:", error);
    }
  };

  // コース一覧を取得する関数
  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "https://mysite-mczi.onrender.com/api/department/"
      );
      if (response.ok) {
        const data: Course[] = await response.json();
        setCourses(data);
        console.log("コース情報の取得に成功しました:", data);
      } else {
        console.error("コース情報の取得に失敗しました:", response.statusText);
      }
    } catch (error) {
      console.error("コース情報の取得に失敗しました:", error);
    }
  };

  // 学生削除を呼び出す関数
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://mysite-mczi.onrender.com/api/teacher/${studentId}/`,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 学生情報更新を呼び出す関数
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://mysite-mczi.onrender.com/api/student/${studentId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("更新成功:", data);
      } else {
        console.error("更新失敗:", response.statusText);
      }
    } catch (error) {
      console.error("更新失敗:", error);
    }
  };

  return (
    <div>
      <h2>学生編集</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input
            type="text"
            name="username"
            value={studentData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>メール:</label>
          <input
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>学科:</label>
          <select name="course_id" value={studentData.course_id}>
            <option value="">選択してください</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>学年:</label>
          <input
            type="text"
            name="school_year"
            value={studentData.school_year}
            onChange={handleChange}
          />
        </div>
        <button type="submit">更新</button>
      </form>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
}

export default StudentEdit;
