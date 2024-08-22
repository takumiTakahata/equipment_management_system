import { Button } from "@mui/material";
import Header from "./header";

function InventoryHistory() {
  return (
    <div id="iventory_history">
      <Header />
      <h2>棚卸履歴</h2>
      <Button variant="outlined">棚卸</Button>
    </div>
  );
}

export default InventoryHistory;
