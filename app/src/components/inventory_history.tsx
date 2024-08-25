import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Header from "./header";

interface InventoryHistorItem {
  date: string;
  lost_property: string[];
  implementer: string;
}

function createInventoryHistory(
  date: string,
  lost_property: string[],
  implementer: string
): InventoryHistorItem {
  return {
    date,
    lost_property,
    implementer,
  };
}

function InventoryHistory() {
  const [data, setData] = useState<InventoryHistorItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = fetch(
      "https://mysite-mczi.onrender.com/api/inventory/"
    ).then((response) => response.json());

    const fetchInventoryList = fetch(
      "https://mysite-mczi.onrender.com/api/inventory_lists/"
    ).then((response) => response.json());

    Promise.all([fetchInventory, fetchInventoryList])
      .then(([inventoryData, inventoryListData]) => {
        console.log("Inventory Data:", inventoryData);
        console.log("Inventory List Data:", inventoryListData);

        const mergedData = [
          ...inventoryListData.map(
            (item: {
              day: string;
              product_names: string[];
              borrower: string;
            }) =>
              createInventoryHistory(
                item.day,
                item.product_names,
                item.borrower
              )
          ),
        ];
        console.log("Merged Data:", mergedData); // 追加
        setData(mergedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
            {data.map((item: InventoryHistorItem) => (
              <TableRow key={item.date}>
                <TableCell component="th" scope="row">
                  {item.date}
                </TableCell>
                <TableCell>
                  {item.lost_property.length > 0 ? (
                    <Accordion>
                      <AccordionSummary>紛失物あり</AccordionSummary>
                      {item.lost_property.map((content: string) => (
                        <AccordionDetails key={content}>
                          {content}
                        </AccordionDetails>
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
