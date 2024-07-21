import { Routes, Route } from "react-router-dom";
import TeacherTop from "../components/teacher_top";
import LoanApproval from "../components/loan_approval";
import ReturnApproval from "../components/return_approval";
import EquipmentRegister from "../components/equipment_register";
import EquipmentEdit from "../components/equipment_edit";
import TeacherList from "../components/teacher_list";
import TeacherEdit from "../components/teacher_edit";
import DepartmentList from "../components/department_list";
import DepartmentRegister from "../components/department_register";
import DepartmentEdit from "../components/department_edit";
import StudentList from "../components/student_list";
import StudentEdit from "../components/student_edit";
import InventoryHistory from "../components/inventory_history";
import Inventory from "../components/inventory";
import NoList from "../components/no_list";
import ViewPdf from "../components/view_pdf";

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
        {/* 学科一覧画面 */}
        <Route path="/department_list" element={<DepartmentList />} />
        {/* 学科登録画面 */}
        <Route path="/department_register" element={<DepartmentRegister />} />
        {/* 学科編集画面 */}
        <Route path="/department_edit" element={<DepartmentEdit />} />
        {/* 学生一覧画面 */}
        <Route path="/student_list" element={<StudentList />} />
        {/* 学生編集画面 */}
        <Route path="/student_edit" element={<StudentEdit />} />
        {/* 棚卸履歴画面 */}
        <Route path="/inventory_history" element={<InventoryHistory />} />
        {/* 棚卸画面 */}
        <Route path="/inventory" element={<Inventory />} />
        {/* ないものリスト画面 */}
        <Route path="/no_list" element={<NoList />} />
        {/* PDF表示画面 */}
        <Route path="/view_pdf" element={<ViewPdf />} />
      </Routes>
    </div>
  );
}

export default AdminRoute;
