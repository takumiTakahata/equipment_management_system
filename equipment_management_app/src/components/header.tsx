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

function Header() {
  const hamburger_menu = () => {
    const hamburger = document.getElementsByClassName("hamburger");
    const hamburger_icons = document.getElementsByClassName("hamburger_icon");
    const navs = document.getElementsByClassName("nav");
    for (let i = 0; i < hamburger_icons.length; i++) {
      hamburger_icons[i].classList.toggle("close");
    }

    for (let i = 0; i < navs.length; i++) {
      hamburger_icons[i].classList.toggle("close");
    }
  };

  return (
    <div>
      <Toolbar className="toolbar">
        <h1 className="title">備品管理システム（仮）</h1>
        <div className="history">
          <HistoryIcon /> {/* 貸出履歴管理icon */}
          <p className="header_text">貸出履歴管理</p>
        </div>
        <div className="equipment_management">
          <EquipmentIcon /> {/* 備品管理icon */}
          <p className="header_text">備品管理</p>
        </div>
        <div className="student_management">
          <StudentIcon /> {/* 学生管理icon */}
          <p className="header_text">学生管理</p>
        </div>
        <div className="teacher_management">
          <TeacherIcon /> {/* 教員管理のicon */}
          <p className="header_text">教員管理</p>
        </div>
        <div className="invetory_management">
          <InvetoryIcon /> {/*棚卸管理のicon*/}
          <p className="header_text">棚卸管理</p>
        </div>
        <div className="category_management">
          <CategoryIcon /> {/*棚卸管理のicon*/}
          <p className="header_text">カテゴリー管理</p>
        </div>

        <div className="logout">
          <LogoutIcon /> {/* ログアウトのicon */}
          <p className="header_text">ログアウト</p>
        </div>

        <div className="hamburger" onClick={hamburger_menu}>
          {/*ハンバーガーのicon */}
          <div className="hamburger_icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <nav className="nav">
          <ul>
            <li className="nav_item">貸出履歴管理</li>
            <li className="nav_item">備品管理</li>
            <li className="nav_item">学生管理</li>
            <li className="nav_item">教員管理</li>
            <li className="nav_item">棚卸管理</li>
            <li className="nav_item">カテゴリー管理</li>
            <li className="nav_item">ログアウト</li>
          </ul>
        </nav>
      </Toolbar>
    </div>
  );
}

export default Header;
