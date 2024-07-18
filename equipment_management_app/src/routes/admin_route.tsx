import { Routes, Route } from "react-router-dom";
import TeacherTop from "../components/teacher_top";

function AdminRoute() {
  return (
    <div>
      <Routes>
        {/* 教員TOP画面 */}
        <Route path="/teacher_top" element={<TeacherTop />} />
      </Routes>
    </div>
  );
}

export default AdminRoute;
