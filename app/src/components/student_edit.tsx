import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./header";
import { TextField, Button, MenuItem } from "@mui/material";
import "./student_edit.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

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
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
    setOpenDeleteDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 学生情報更新を呼び出す関数
  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
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
    setOpenEditDialog(false);
  };

  return (
    <div id="student_edit">
      <Header />
      <div className="student_edit_flex">
        <h2 className="student_edit_title">学生編集</h2>
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          variant="contained"
          color="secondary"
          className="student_delete_button"
        >
          削除
        </Button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpenEditDialog(true);
        }}
      >
        <div className="student_edit_text">
          <TextField
            label="名前"
            name="username"
            value={studentData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="student_edit_text">
          <TextField
            label="メール"
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="student_edit_text">
          <TextField
            select
            label="学科"
            name="course_id"
            value={studentData.course_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">選択してください</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="student_edit_text">
          <TextField
            label="学年"
            name="school_year"
            value={studentData.school_year}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="student_edit_button"
        >
          更新
        </Button>
      </form>

      {/* 編集確認ダイアログ */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        className="student_edit_popup"
      >
        <DialogTitle className="popup_title">
          入力された項目が正しいか確認してください
        </DialogTitle>
        <DialogContent>
          <DialogContentText>名前</DialogContentText>
          <p className="popup_text">{studentData.username}</p>
          <DialogContentText>メール</DialogContentText>
          <p className="popup_text">{studentData.email}</p>
          <DialogContentText>学科 </DialogContentText>
          <p className="popup_text">
            {courses.find((course) => course.id === studentData.course_id)
              ?.name || "未選択"}
          </p>
          <DialogContentText>学年</DialogContentText>
          <p className="popup_text">{studentData.school_year}</p>
        </DialogContent>
        <DialogActions className="popup_button">
          <Button
            onClick={() => setOpenEditDialog(false)}
            color="primary"
            className="popup_student_edit_cancel_button"
          >
            キャンセル
          </Button>
          <Button
            onClick={() => handleSubmit(undefined)}
            color="primary"
            className="popup_student_edit_button"
          >
            更新
          </Button>
        </DialogActions>
      </Dialog>

      {/* 削除確認ダイアログ */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        className="student_delete_popup"
      >
        <DialogTitle className="popup_title">削除確認</DialogTitle>
        <p className="popup_text">本当にこの学生を削除しますか？</p>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            color="primary"
            className="popup_student_delete_cancel_button"
          >
            キャンセル
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            className="popup_student_delete_button"
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StudentEdit;
