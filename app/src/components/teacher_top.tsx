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
import { useEffect, useState } from "react";
import "./teacher_top.css";

type LoanHistory = {
  loan_date: string; //貸出日
  return_date: string; //返却日
  product_id: number;
  product_name: string;
  deadline: string; //返却期限
  borrower: string; //借りた人
  loan_approver: string; //貸出承認者
  return_approver: string; //返却承認者
};

function createLoanHistory(
  loan_date: string,
  return_date: string,
  product_id: number,
  product_name: string,
  deadline: string,
  borrower: string,
  loan_approver: string,
  return_approver: string
): LoanHistory {
  return {
    loan_date,
    return_date,
    product_id,
    product_name,
    deadline,
    borrower,
    loan_approver,
    return_approver,
  };
}

//テストデータ
const initialData: LoanHistory[] = [];
const ITEMS_PER_PAGE = 5;

function TeacherTop() {
  const [currentPage, setCurrentPage] = useState(1); //currentPageが現在のページ番号
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const [data, setData] = useState<LoanHistory[]>(initialData);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "https://mysite-mczi.onrender.com/api/history/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const result: LoanHistory[] = await response.json();
        setData(result); // Update state with fetched history
      } catch (error) {
        console.error("An error occurred while fetching history", error);
      }
    };

    fetchHistory();
  }, []);
  console.log(data);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
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
                  {item.loan_date ? (
                    <div className="red_circle">済</div>
                  ) : (
                    <div className="green_circle">未</div>
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.loan_date}
                </TableCell>
                <TableCell>
                  {item.return_date ? item.return_date : "未返却"}
                </TableCell>
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
