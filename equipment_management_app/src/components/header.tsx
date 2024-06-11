import "./header.css";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
        <Typography variant="body1">
          <div>備品管理システム（仮）</div>
        </Typography>
        <Icon path={mdiHistory} size={2.5} />
        <p>貸出履歴管理</p>
        <Icon path={mdiFormatListBulletedSquare} size={2.5} />
        <p>備品管理</p>
        <Icon path={mdiAccountSchool} size={2.5} />
        <p>学生管理</p>
        <Icon path={mdiHumanMaleBoard} size={2.5} />
        <p>教員管理</p>
        <Icon path={mdiInboxMultiple} size={2.5} />
        <p>棚卸</p>
        <Icon path={mdiShape} size={2.5} />
        <p>カテゴリー管理</p>
        <Icon path={mdiLogout} size={2.5} />
        <p>ログアウト</p>
      </Toolbar>
    </div>
  );
}

export default header;
