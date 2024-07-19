import { Routes, Route } from "react-router-dom";
import TeacherTop from "../components/teacher_top";
import LoanApproval from "../components/loan_approval";
import ReturnApproval from "../components/return_approval";
import EquipmentRegister from "../components/equipment_register";
import EquipmentEdit from "../components/equipment_edit";
import TeacherList from "../components/teacher_list";
import TeacherEdit from "../components/teacher_edit";

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
        {/* 備品編集画面 */}
        <Route path="/equipment_edit" element={<EquipmentEdit />} />
        {/* 教員一覧画面 */}
        <Route path="/teacher_list" element={<TeacherList />} />
        {/* 教員編集画面 */}
        <Route path="/teacher_edit" element={<TeacherEdit />} />
      </Routes>
    </div>
  );
}

export default AdminRoute;
