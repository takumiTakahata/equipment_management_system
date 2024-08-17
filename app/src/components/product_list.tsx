import React from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";

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
          <p className="limit">貸出期限:3ヶ月</p>
        </div>
        <div className="green_circle">
          <p>貸出可</p>
        </div>
      </ListItemButton>
    </ListItem>
  );
}

function ProductList() {
  return (
    <div>
      <p>ユーザーTOP</p>
    </div>
  );
}

export default ProductList;
