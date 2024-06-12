import "./header.css";
import Toolbar from "@mui/material/Toolbar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Icon from "@mdi/react";
import { mdiHistory } from "@mdi/js"; //貸出履歴管理のicon
import { mdiInboxMultiple } from "@mdi/js"; //棚卸管理のicon
import { mdiFormatListBulletedSquare } from "@mdi/js"; //備品一覧のicon
import { mdiHumanMaleBoard } from "@mdi/js"; //教員管理のicon
import { mdiAccountSchool } from "@mdi/js"; //学生管理のicon
import { mdiShape } from "@mdi/js"; //カテゴリー管理のicon
import { mdiLogout } from "@mdi/js";

function header() {
  return (
    <div>
      <Toolbar className="toolbar">
        <p className="title">備品管理システム（仮）</p>
        <div className="history">
          {/* 貸出履歴管理icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon"
          >
            <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3" />
            <title>貸出履歴管理</title>
          </svg>
          <p className="header_text">貸出履歴管理</p>
        </div>

        <div className="equipment_management">
          {/* 備品管理icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon"
          >
            <title>備品管理</title>
            <path d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9" />
          </svg>
          <p className="header_text">備品管理</p>
        </div>

        <div className="student_management">
          {/* 学生管理icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon"
          >
            <title>学生管理</title>
            <path d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8L8.11 7.06L5 5.5L12 2L19 5.5V10.5H18V6L15.89 7.06L16 8M12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" />
          </svg>
          <p className="header_text">学生管理</p>
        </div>

        <div className="teacher_management">
          {/* 教員管理のicon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon"
          >
            <title>教員管理</title>
            <path d="M20,17A2,2 0 0,0 22,15V4A2,2 0 0,0 20,2H9.46C9.81,2.61 10,3.3 10,4H20V15H11V17M15,7V9H9V22H7V16H5V22H3V14H1.5V9A2,2 0 0,1 3.5,7H15M8,4A2,2 0 0,1 6,6A2,2 0 0,1 4,4A2,2 0 0,1 6,2A2,2 0 0,1 8,4Z" />
          </svg>
          <p className="header_text">教員管理</p>
        </div>
      </Toolbar>
    </div>
  );
}

export default header;
