import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import "./teacher_top.css";

function createLoanHistory(
  loan_date: string, //貸出日
  return_date: string, //返却日
  product_id: number,
  product_name: string,
  deadline: string, //返却期限
  borrower: string, //借りた人
  loan_approver: string, //貸出承認者
  return_approver: string //返却承認者
) {
  return {
    loan_date,
    return_date,
    product_id: product_id,
    product_name: product_name,
    deadline: deadline,
    borrower,
    loan_approver,
    return_approver,
  };
}

//テストデータ
const data: [string, string, number, string, string, string, string, string][] =
  [
    [
      "2024/02/10",
      "2024/03/10",
      1,
      "誰でも簡単に",
      "2024/04/10",
      "佐藤",
      "川島",
      "伊藤",
    ],
    [
      "2024/04/5",
      "未返却",
      2,
      "過去問道場",
      "2024/05/5",
      "橋本",
      "豊橋",
      "岡田",
    ],
    [
      "2024/05/10",
      "未返却",
      3,
      "ディスプレイ",
      "2024/09/10",
      "佐藤",
      "川島",
      "渡辺",
    ],
    ["2024/05/04", "未返却", 4, "本", "2024/10/10", "佐藤", "前田", "渡辺"],
    ["2024/05/13", "未返却", 5, "HDMI", "2024/11/11", "長谷川", "川島", "渡辺"],
    [
      "2024/05/04",
      "未返却",
      6,
      "パソコン",
      "2025/12/10",
      "斎藤",
      "川島",
      "伊藤",
    ],
    [
      "2024/05/12",
      "未返却",
      7,
      "パソコン",
      "2025/12/10",
      "斎藤",
      "川島",
      "伊藤",
    ],
  ];

const ITEMS_PER_PAGE = 5;

function TeacherTop() {
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
    .map((item) => createLoanHistory(...item));
  return (
    <div id="teacher_top">
      <h2>教員TOP</h2>
      <form action="">
        <FormControl sx={{ width: 100 }}>
          <InputLabel id="input_label">貸出中</InputLabel>
          <Select labelId="input_label">
            <MenuItem value="">貸出中</MenuItem>
            <MenuItem value="">貸出前</MenuItem>
          </Select>
        </FormControl>
        <TextField
          placeholder="備品名"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained">
          検索
        </Button>
      </form>
      <TableContainer component={Paper} className="tablecontainer">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>貸出日</TableCell>
              <TableCell>返却日</TableCell>
              <TableCell>備品id</TableCell>
              <TableCell>備品名</TableCell>
              <TableCell>返却期限</TableCell>
              <TableCell>借りた人</TableCell>
              <TableCell>貸出承認者</TableCell>
              <TableCell>返却承認者</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={`${item.loan_date}-${item.product_id}`}>
                <TableCell>
                  {item.product_id % 2 === 1 ? (
                    <div className="red_circle">済</div>
                  ) : (
                    <div className="green_circle">未</div>
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.loan_date}
                </TableCell>
                <TableCell>{item.return_date}</TableCell>
                <TableCell>{item.product_id}</TableCell>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{item.deadline}</TableCell>
                <TableCell>{item.borrower}</TableCell>
                <TableCell>{item.loan_approver}</TableCell>
                <TableCell>{item.return_approver}</TableCell>
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
      {/*
        count: 総ページ数を計算
        page: 現在のページ番号
        onChange: ページ変更時に呼び出される関数
      */}
    </div>
  );
}

export default TeacherTop;
