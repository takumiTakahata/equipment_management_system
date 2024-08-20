import React from "react";
import { ListItem } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import "./lending_request.css";

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

function LendingRequest() {
  return (
    <div className="return_request">
      <p className="title">
        選択するものが正しいか<br></br>確認してください
      </p>
    </div>
  );
}

export default LendingRequest;
