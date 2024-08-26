import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
// import "./header.css";
import "../components/header.css";
import {
  HistoryIcon,
  EquipmentIcon,
  StudentIcon,
  TeacherIcon,
  InvetoryIcon,
  CategoryIcon,
  LogoutIcon,
} from "../images/icon";

import { useNavigate } from "react-router-dom";

function Header() {
  const options = [
    "貸出履歴管理",
    "備品管理",
    "学生管理",
    "教員管理",
    "棚卸管理",
    "カテゴリー管理",
    "ログアウト",
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const logOut = () => {
    // ローカルストレージからトークンを削除
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // 指定されたパスにリダイレクト
    navigate("/admin_login");
  };

  return (
    <div id="header">
      <Toolbar className="toolbar">
        <h1 className="header_title">備品管理システム（仮）</h1>
        <div
          className="history"
          onClick={() => handleNavigation("/teacher_top")}
        >
          <HistoryIcon /> {/* 貸出履歴管理icon */}
          <p className="header_text">貸出履歴管理</p>
        </div>
        <div
          className="equipment_management"
          onClick={() => handleNavigation("/equipment_list")}
        >
          <EquipmentIcon /> {/* 備品管理icon */}
          <p className="header_text">備品管理</p>
        </div>
        <div
          className="student_management"
          onClick={() => handleNavigation("/student_list")}
        >
          <StudentIcon /> {/* 学生管理icon */}
          <p className="header_text">学生管理</p>
        </div>
        <div
          className="teacher_management"
          onClick={() => handleNavigation("/teacher_list")}
        >
          <TeacherIcon /> {/* 教員管理のicon */}
          <p className="header_text">教員管理</p>
        </div>
        <div
          className="invetory_management"
          onClick={() => handleNavigation("/inventory_history")}
        >
          <InvetoryIcon /> {/*棚卸管理のicon*/}
          <p className="header_text">棚卸管理</p>
        </div>
        <div
          className="category_management"
          onClick={() => handleNavigation("/category_list")}
        >
          <CategoryIcon /> {/*棚卸管理のicon*/}
          <p className="header_text">カテゴリー管理</p>
        </div>

        <div className="logout" onClick={logOut}>
          <LogoutIcon /> {/* ログアウトのicon */}
          <p className="header_text">ログアウト</p>
        </div>

        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <div className="hamburger">
            <div className="hamburger_icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <div className="menu_item">
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                <div className="menu_text">{option}</div>
              </MenuItem>
            ))}
          </div>
        </Menu>
      </Toolbar>
    </div>
  );
}

export default Header;
