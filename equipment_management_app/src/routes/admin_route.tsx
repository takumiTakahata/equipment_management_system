import { Routes, Route } from "react-router-dom";
import TeacherTop from "../components/teacher_top";
import LoanApproval from "../components/loan_approval";
import ReturnApproval from "../components/return_approval";

function AdminRoute() {
  return (
    <div>
      <Routes>
        {/* 教員TOP画面 */}
        <Route path="/teacher_top" element={<TeacherTop />} />
        {/* 貸出承認画面 */}
        <Route path="/loan_approval" element={<LoanApproval />} />

        <Route path="/return_approval" element={<ReturnApproval />} />
      </Routes>
    </div>
  );
}

export default AdminRoute;
