import { Routes, Route } from "react-router-dom";
import TeacherTop from "../components/teacher_top";
import LoanApproval from "../components/loan_approval";
import ReturnApproval from "../components/return_approval";
import EquipmentRegister from "../components/equipment_register";

function AdminRoute() {
  return (
    <div>
      <Routes>
        {/* 教員TOP画面 */}
        <Route path="/teacher_top" element={<TeacherTop />} />
        {/* 貸出承認画面 */}
        <Route path="/loan_approval" element={<LoanApproval />} />
        {/* 返却承認画面 */}
        <Route path="/return_approval" element={<ReturnApproval />} />
        {/* 備品登録画面 */}
        <Route path="/equipment_register" element={<EquipmentRegister />} />
      </Routes>
    </div>
  );
}

export default AdminRoute;
