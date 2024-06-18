import "./header.css";
import Toolbar from "@mui/material/Toolbar";
import {
  HistoryIcon,
  EquipmentIcon,
  StudentIcon,
  TeacherIcon,
  InvetoryIcon,
  CategoryIcon,
  LogoutIcon,
} from "../images/icon";

function header() {
  return (
    <div>
      <Toolbar className="toolbar">
        <h1 className="title">備品管理システム（仮）</h1>
        <div className="history">
          {/* 貸出履歴管理icon */}
          <HistoryIcon />
          <p className="header_text">貸出履歴管理</p>
        </div>
        <div className="equipment_management">
          {/* 備品管理icon */}
          <p className="header_text">備品管理</p>
        </div>
        <div className="student_management">
          {/* 学生管理icon */}

          <p className="header_text">学生管理</p>
        </div>
        <div className="teacher_management">
          {/* 教員管理のicon */}

          <p className="header_text">教員管理</p>
        </div>
        <div className="invetory_management">
          {/*棚卸管理のicon*/}

          <p className="header_text">棚卸管理</p>
        </div>
        <div className="category_management">
          {/*カテゴリー管理のicon*/}
          <p className="header_text">カテゴリー管理</p>
        </div>

        <div className="logout">
          {/* ログアウトのicon */}
          <p className="header_text">ログアウト</p>
        </div>

        <div className="hamburger">{/*ハンバーガーのicon */}</div>
      </Toolbar>
    </div>
  );
}

export default header;
