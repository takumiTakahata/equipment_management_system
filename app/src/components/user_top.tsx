import React from "react";
import { ListItem } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import "./user_top.css";
import Footer from "./footer";

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton className="list_button">
        <div className="contents">
          <p className="product_name">備品名:</p>
          <p className="name">
            いちばんやさしいITパスポート絶対合格の教科書+出る順問題集
          </p>
          <p className="limit">返却期限:2024/08/20</p>
        </div>
      </ListItemButton>
    </ListItem>
  );
}

function UserTop() {
  const navigate = useNavigate();

  const borrowButton = () => {
    navigate("/return_qr_reading");
  };
  return (
    <div id="user_top">
      <p className="title">借りている物一覧</p>

      <div className="list">
        <Box
          sx={{
            width: "100%",
            height: 600,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <FixedSizeList
            height={400}
            width={450}
            itemSize={150}
            itemCount={2}
            overscanCount={10}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      </div>
      <div className="button">
        <Button
          className="return_button"
          variant="contained"
          color="primary"
          onClick={borrowButton}
        >
          返却申請へ
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default UserTop;
