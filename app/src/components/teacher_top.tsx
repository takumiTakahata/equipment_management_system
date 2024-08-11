import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function TeacherTop() {
  return (
    <div>
      <h2>教員TOP</h2>
      <FormControl sx={{ width: 100 }}>
        <InputLabel id="input_label">貸出中</InputLabel>
        <Select labelId="input_label">
          <MenuItem value="">貸出中</MenuItem>
          <MenuItem value="">貸出前</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default TeacherTop;
