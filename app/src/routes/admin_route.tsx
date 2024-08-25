import { Routes, Route } from "react-router-dom";
import TeacherTop from "../components/teacher_top";
import LoanApproval from "../components/loan_approval";
import ReturnApproval from "../components/return_approval";
import EquipmentRegister from "../components/equipment_register";
import EquipmentList from "../components/equipment_list";
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
import Login from "../components/login";
import TeacherRegister from "../components/teacher_register";
import CategoryRegister from "../components/category_register";
import CategoryList from "../components/category_list";
import CategoryEdit from "../components/category_edit";
import { Navigate } from "react-router-dom";
import AdminProtectedRoute from "./AdminProtectedRoute";

function AdminRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/admin_login" />} />
        {/* ログイン画面 */}
        <Route path="/admin_login" element={<Login />} />
        {/* 教員TOP画面 */}
        <Route
          path="/teacher_top"
          element={
            <AdminProtectedRoute>
              <TeacherTop />
            </AdminProtectedRoute>
          }
        />
        {/* 貸出承認画面 */}
        <Route
          path="/loan_approval"
          element={
            <AdminProtectedRoute>
              <LoanApproval />
            </AdminProtectedRoute>
          }
        />
        {/* 返却承認画面 */}
        <Route
          path="/return_approval"
          element={
            <AdminProtectedRoute>
              <ReturnApproval />
            </AdminProtectedRoute>
          }
        />
        {/* 備品登録画面 */}
        <Route
          path="/equipment_register"
          element={
            <AdminProtectedRoute>
              <EquipmentRegister />
            </AdminProtectedRoute>
          }
        />
        {/* 備品一覧画面 */}
        <Route
          path="/equipment_list"
          element={
            <AdminProtectedRoute>
              <EquipmentList />
            </AdminProtectedRoute>
          }
        />
        {/* 備品編集画面 */}
        <Route
          path="/equipment_edit"
          element={
            <AdminProtectedRoute>
              <EquipmentEdit />
            </AdminProtectedRoute>
          }
        />
        {/* 教員登録画面 */}
        <Route
          path="/teacher_register"
          element={
            <AdminProtectedRoute>
              <TeacherRegister />
            </AdminProtectedRoute>
          }
        />
        {/* 教員一覧画面 */}
        <Route
          path="/teacher_list"
          element={
            <AdminProtectedRoute>
              <TeacherList />
            </AdminProtectedRoute>
          }
        />
        {/* 教員編集画面 */}
        <Route
          path="/teacher_edit/:id"
          element={
            <AdminProtectedRoute>
              <TeacherEdit />
            </AdminProtectedRoute>
          }
        />
        {/* 学科一覧画面 */}
        <Route
          path="/department_list"
          element={
            <AdminProtectedRoute>
              <DepartmentList />
            </AdminProtectedRoute>
          }
        />
        {/* 学科登録画面 */}
        <Route
          path="/department_register"
          element={
            <AdminProtectedRoute>
              <DepartmentRegister />
            </AdminProtectedRoute>
          }
        />
        {/* 学科編集画面 */}
        <Route
          path="/department_edit"
          element={
            <AdminProtectedRoute>
              <DepartmentEdit />
            </AdminProtectedRoute>
          }
        />
        {/* 学生一覧画面 */}
        <Route
          path="/student_list"
          element={
            <AdminProtectedRoute>
              <StudentList />
            </AdminProtectedRoute>
          }
        />
        {/* 学生編集画面 */}
        <Route
          path="/student_edit/:id"
          element={
            <AdminProtectedRoute>
              <StudentEdit />
            </AdminProtectedRoute>
          }
        />
        {/* 棚卸履歴画面 */}
        <Route
          path="/inventory_history"
          element={
            <AdminProtectedRoute>
              <InventoryHistory />
            </AdminProtectedRoute>
          }
        />
        {/* 棚卸画面 */}
        <Route
          path="/inventory"
          element={
            <AdminProtectedRoute>
              <Inventory />
            </AdminProtectedRoute>
          }
        />
        {/* ないものリスト画面 */}
        <Route
          path="/no_list"
          element={
            <AdminProtectedRoute>
              <NoList />
            </AdminProtectedRoute>
          }
        />
        {/* PDF表示画面 */}
        <Route
          path="/view_pdf"
          element={
            <AdminProtectedRoute>
              <ViewPdf />
            </AdminProtectedRoute>
          }
        />
        {/* カテゴリ登録画面 */}
        <Route
          path="/category_register"
          element={
            <AdminProtectedRoute>
              <CategoryRegister />
            </AdminProtectedRoute>
          }
        />
        {/* カテゴリ一覧画面 */}
        <Route
          path="/category_list"
          element={
            <AdminProtectedRoute>
              <CategoryList />
            </AdminProtectedRoute>
          }
        />
        {/* カテゴリ編集画面 */}
        <Route
          path="/category_edit"
          element={
            <AdminProtectedRoute>
              <CategoryEdit />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default AdminRoute;
