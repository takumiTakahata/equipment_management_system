import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Header from "./header";
import "./no_list.css";
import { useEffect, useState } from "react";

function createNoList(id: number, name: string, deadline: string) {
  return {
    id, //備品id
    name, //備品名
    deadline, //返却期限
  };
}

const NoList = () => {
  const [rows, setRows] = useState<ReturnType<typeof createNoList>[]>([]);
  const [id, setId] = useState<number[]>([]);
  const [missingIds, setMissingIds] = useState<number[]>([]);

  useEffect(() => {
    const fetch_equipment_id = async () => {
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
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        const ids = data.map((item: { id: number }) => item.id);
        setId(ids);

        // localStorageからqrResultを取得
        const qrResult = JSON.parse(
          localStorage.getItem("qrresult") || "[]"
        ).map(Number);

        // idの配列とqrResultを照合
        const missing = ids.filter((id: number) => !qrResult.includes(id));
        setMissingIds(missing);
      } catch (error) {
        console.error("An error occurred while fetching categories", error);
      }
    };

    fetch_equipment_id();
  }, []);

  useEffect(() => {
    const fetch_missing_details = async () => {
      try {
        const missingDetails = await Promise.all(
          missingIds.map(async (id) => {
            const response = await fetch(
              `https://mysite-mczi.onrender.com/api/equipment/${id}/`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              throw new Error(`Failed to fetch details for id ${id}`);
            }

            const data = await response.json();
            return createNoList(data.id, data.name, data.deadline);
          })
        );

        setRows(missingDetails);
      } catch (error) {
        console.error(
          "An error occurred while fetching missing details",
          error
        );
      }
    };

    if (missingIds.length > 0) {
      fetch_missing_details();
    }
  }, [missingIds]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://mysite-mczi.onrender.com/api/equipment/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ missingIds, action: "missing" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update missing ids");
      }
      localStorage.removeItem("qrresult");
      console.log("Missing ids updated successfully");
    } catch (error) {
      console.error("An error occurred while updating missing ids", error);
    }
  };

  return (
    <div id="no_list">
      <Header />
      <h2 className="no_list_title">ないものリスト</h2>
      <Paper elevation={0} sx={{ width: "70%", margin: "auto" }}>
        <TableContainer className="tablecontainer">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>備品id</TableCell>
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
                  <TableCell>
                    {Number(item.deadline) === 31
                      ? "1カ月"
                      : Number(item.deadline) === 62
                      ? "2カ月"
                      : Number(item.deadline) === 93
                      ? "3カ月"
                      : Number(item.deadline) === 186
                      ? "6カ月"
                      : Number(item.deadline) === 365
                      ? "1年"
                      : item.deadline}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className="button">
        <Button variant="outlined" onClick={handleSubmit}>
          ステータスを紛失中に変更して棚卸を終了
        </Button>
      </div>
    </div>
  );
};
export default NoList;
