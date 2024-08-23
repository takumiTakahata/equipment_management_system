import React from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import "./product_list.css";
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
  const category = [
    {
      value: "すべて",
      label: "すべて",
    },
    {
      value: "本",
      label: "本",
    },
    {
      value: "モニター",
      label: "モニター",
    },
  ];
  const lending = [
    {
      value: "貸出中",
      label: "貸出中",
    },
    {
      value: "貸出可",
      label: "貸出可",
    },
  ];
  return (
    <div id="product_list">
      <p className="title">備品一覧</p>
      <div className="search">
        <div className="category">
          <TextField
            className="category"
            id="outlined-select-currency"
            select
            defaultValue="すべて"
          >
            {category.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="leading">
          <TextField
            className="category"
            id="outlined-select-currency"
            select
            defaultValue="貸出中"
          >
            {lending.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <div className="search_var">
        <TextField className="search_field">
          <SearchIcon></SearchIcon>
        </TextField>
        <Button className="button">検索</Button>
      </div>
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
            height={600}
            width={450}
            itemSize={150}
            itemCount={30}
            overscanCount={10}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default ProductList;
