import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

function TeacherTop() {
  return (
    <div>
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
    </div>
  );
}

export default TeacherTop;
