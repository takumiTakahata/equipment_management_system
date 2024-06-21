import "./header.css";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
  const options = [
    "貸出履歴管理",
    "備品管理",
    "学生管理",
    "教員管理",
    "棚卸管理",
    "カテゴリー管理",
    "ログアウト",
  ];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
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
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={handleClose}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Toolbar>
    </div>
  );
}

export default Header;
