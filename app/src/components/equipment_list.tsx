import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import "./equipment_list.css";
import AddIcon from "@mui/icons-material/Add";

function createEquipmentList(
  id: number, //備品ID
  name: string, //備品名
  deadline: string //返却期限
) {
  return {
    id,
    name,
    deadline,
  };
}

const data: [number, string, string][] = [
  [1, "ITパスポート", "2024/04/10"],
  [2, "ITパスポート", "2024/04/10"],
  [3, "ITパスポート", "2024/04/10"],
  [4, "ITパスポート", "2024/04/10"],
  [5, "ITパスポート", "2024/04/10"],
  [6, "ITパスポート", "2024/04/10"],
];

const ITEMS_PER_PAGE = 5;

function EquipmentList() {
  const loan_status = [
    {
      value: "すべて",
      label: "すべて",
    },
    {
      value: "貸出可",
      label: "貸出可",
    },
    {
      value: "貸出中",
      label: "貸出中",
    },
    {
      value: "紛失中",
      label: "紛失中",
    },
  ];

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
      value: "ディスプレイ",
      label: "ディスプレイ",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); //currentPageが現在のページ番号
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = data
    .slice(startIndex, startIndex + ITEMS_PER_PAGE)
    .map((item) => createEquipmentList(...item));

  return (
    <div>
      <h2>備品一覧</h2>
      <TextField select id="outlined-select-currency" defaultValue="すべて">
        {loan_status.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField select id="outlined-select-currency" defaultValue="すべて">
        {category.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        placeholder="ITパスポート"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="outlined">検索</Button>
      <Button variant="outlined">備品登録</Button>
      <Button variant="outlined">すべて選択</Button>
      <TableContainer component={Paper} className="tablecontainer">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>備品id</TableCell>
              <TableCell>備品名</TableCell>
              <TableCell>返却期限</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.id % 5 === 0 ? (
                    <div className="red_circle">貸出中</div>
                  ) : item.id % 3 === 0 ? (
                    <div className="green_circle">貸出可</div>
                  ) : (
                    <div className="blue_circle">紛失中</div>
                  )}
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.deadline}</TableCell>
                <TableCell>
                  <Button>
                    <AddIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(data.length / ITEMS_PER_PAGE)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
}

export default EquipmentList;
