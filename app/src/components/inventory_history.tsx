import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

function createInventoryHistory(
  date: string,
  lost_property: string[],
  implementer: string
) {
  return {
    date,
    lost_property,
    implementer,
  };
}
const data: [string, string[], string][] = [
  ["2021/01/11", ["ITパスポート", "基本情報"], "高橋たろう"],
  ["2021/03/03", ["基本情報"], "伊藤たろう"],
  ["2021/12/11", [], "佐々木たろう"],
];

const rows = data.map((item) => {
  return createInventoryHistory(...item);
});

function InventoryHistory() {
  const navigate = useNavigate();
  const Inventory = () => {
    navigate("/inventory");
  };

  return (
    <div id="iventory_history">
      <Header />
      <h2>棚卸履歴</h2>
      <Button variant="outlined" onClick={Inventory}>
        棚卸
      </Button>
      <TableContainer component={Paper} className="tablecontainer">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>実施日</TableCell>
              <TableCell>紛失物</TableCell>
              <TableCell>実施者</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {item.date}
                </TableCell>
                <TableCell>
                  {item.lost_property.length > 0 ? (
                    <Accordion>
                      <AccordionSummary>紛失物あり</AccordionSummary>
                      {item.lost_property.map((content) => (
                        <AccordionDetails>{content}</AccordionDetails>
                      ))}
                    </Accordion>
                  ) : (
                    <p>紛失物なし</p>
                  )}
                </TableCell>
                <TableCell>{item.implementer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InventoryHistory;
