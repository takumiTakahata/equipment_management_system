import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Header from "./header";

function createNoList(id: number, name: string, deadline: string) {
  return {
    id, //備品id
    name, //備品名
    deadline, //返却期限
  };
}

const data: [number, string, string][] = [
  [1, "ITパスポート", "3ヶ月"],
  [2, "基本情報", "1ヶ月"],
  [3, "応用情報", "1ヶ月"],
];

const rows = data.map((item) => {
  return createNoList(...item);
});

function NoList() {
  return (
    <div className="no_list">
      <Header />
      <h2>ないものリスト</h2>
      <Paper elevation={0} sx={{ width: "70%", margin: "auto" }}>
        <TableContainer className="tablecontainer">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>実施日</TableCell>
                <TableCell>紛失物</TableCell>
                <TableCell>返却期限</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item) => (
                <TableRow className="tableRow" key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.deadline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className="button">
        <Button variant="outlined">
          ステータスを紛失中に変更して棚卸を終了
        </Button>
      </div>
    </div>
  );
}

export default NoList;
