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
import { useState, useEffect } from "react";

interface Equipment {
  id: number; // 備品ID
  categories_id: number; // カテゴリーID
  name: string; // 備品名
  deadline: string; // 返却期限
  lost_status: boolean;
  active_flag: boolean; // アクティブフラグ
}

function formatDeadline(deadline: string | number): string {
  const days = Number(deadline);
  switch (days) {
    case 31:
      return "1カ月";
    case 62:
      return "2カ月";
    case 93:
      return "3カ月";
    case 186:
      return "6カ月";
    case 365:
      return "1年";
    default:
      return String(deadline);
  }
}

function renderRow({ index, style, data }: ListChildComponentProps) {
  const equipment = data[index];

  if (equipment.lost_status) {
    return null;
  }
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton className="list_button">
        <div className="contents">
          <p className="product_name">備品名:</p>
          <p className="name">{equipment.name}</p>
          <p className="limit">貸出期限:{formatDeadline(equipment.deadline)}</p>
        </div>
        <div className={equipment.active_flag ? "green_circle" : "red_circle"}>
          <p>{equipment.active_flag ? "貸出可" : "貸出中"}</p>
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

  const [data, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(
          "https://mysite-mczi.onrender.com/api/equipment/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch equipment");
        }

        const result = await response.json();
        setEquipment(result); // Update state with fetched equipment
      } catch (error) {
        console.error("An error occurred while fetching equipment", error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <div id="product_list">
      <p className="page_title">備品一覧</p>
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
            itemCount={data.length}
            overscanCount={10}
            itemData={data}
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
