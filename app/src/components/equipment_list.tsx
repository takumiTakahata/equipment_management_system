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

const rows = [
  createEquipmentList(1, "ITパスポート", "2024/04/10"),
  createEquipmentList(2, "ITパスポート", "2024/04/10"),
  createEquipmentList(3, "ITパスポート", "2024/04/10"),
  createEquipmentList(4, "ITパスポート", "2024/04/10"),
  createEquipmentList(5, "ITパスポート", "2024/04/10"),
  createEquipmentList(6, "ITパスポート", "2024/04/10"),
];

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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell></TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EquipmentList;
