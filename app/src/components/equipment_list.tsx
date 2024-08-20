import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";

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
      <TextField></TextField>
    </div>
  );
}

export default EquipmentList;
