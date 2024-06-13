import "./header.css";
import Toolbar from "@mui/material/Toolbar";

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

        <div className="invetory_management">
          {/*棚卸管理のicon*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon"
          >
            <title>棚卸管理</title>
            <path d="M19,8V5H5V8H9A3,3 0 0,0 12,11A3,3 0 0,0 15,8H19M19,3A2,2 0 0,1 21,5V12A2,2 0 0,1 19,14H5A2,2 0 0,1 3,12V5A2,2 0 0,1 5,3H19M3,15H9A3,3 0 0,0 12,18A3,3 0 0,0 15,15H21V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V15Z" />
          </svg>
          <p className="header_text">棚卸管理</p>
        </div>

        <div className="category_management">
          {/*カテゴリー管理のicon*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon"
          >
            <title>カテゴリー管理</title>
            <path d="M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z" />
          </svg>
          <p className="header_text">カテゴリー管理</p>
        </div>

        <div className="logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon"
          >
            <title>logout</title>
            <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" />
          </svg>
          <p>ログアウト</p>
        </div>
      </Toolbar>
    </div>
  );
}

export default header;
