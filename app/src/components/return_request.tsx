import React from "react";
import { ListItem } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import "./return_request.css";

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

function ReturnRequest() {
  return (
    <div className="return_request">
      <p className="title">
        選択するものが正しいか<br></br>確認してください
      </p>
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
        <Button className="request_button" variant="contained">
          返却申請
        </Button>
      </div>
      <div className="button">
        <Button className="continue_button" variant="contained" color="primary">
          続けて読み込む
        </Button>
      </div>
      <div className="button">
        <Button className="cancel_button" variant="contained">
          キャンセル
        </Button>
      </div>
    </div>
  );
}

export default ReturnRequest;
