import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TeacherEdit() {
  // URLパラメータからidを取得
  const { id } = useParams();
  const [teacherId, setTeacherId] = useState("");
  const [teacherData, setTeacherData] = useState({
    username: "",
    email: "",
  });

  // URLパラメータから取得したidをセット
  useEffect(() => {
    if (id) {
      setTeacherId(id);
      fetchTeacherData(id);
    }
  }, [id]);

  // 教員情報を取得する関数
  const fetchTeacherData = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/teacher/${id}/`);
      if (response.ok) {
        const data = await response.json();
        setTeacherData(data);
      } else {
        console.error("教員情報の取得に失敗しました:", response.statusText);
      }
    } catch (error) {
      console.error("教員情報の取得に失敗しました:", error);
    }
  };

  // 教員削除を呼び出す関数
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/teacher/${teacherId}/`,
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
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 教員情報更新を呼び出す関数
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/teacher/${teacherId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teacherData),
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
      <h2>教員編集</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input
            type="text"
            name="username"
            value={teacherData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>メール:</label>
          <input
            type="email"
            name="email"
            value={teacherData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">更新</button>
      </form>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
}

export default TeacherEdit;
