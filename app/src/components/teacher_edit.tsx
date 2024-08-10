import React, { useState } from "react";

function TeacherEdit() {
  // 仮で初期値を "1" に設定
  const [teacherId, setTeacherId] = useState("1");

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

  return (
    <div>
      <h2>教員編集</h2>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
}

export default TeacherEdit;
