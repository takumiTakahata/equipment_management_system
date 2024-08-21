import {
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import "./equipment_list.css";

interface Equipment {
  id: number; // 備品ID
  categories_id: number; // カテゴリーID
  name: string; // 備品名
  deadline: string; // 返却期限
  lost_status: boolean; // 紛失ステータス
  active_flag: boolean; // アクティブフラグ
}

const ITEMS_PER_PAGE = 5;

function EquipmentList() {
  const [data, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/equipment/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch equipment");
        }

        const data = await response.json();
        console.log(data);
        setEquipment(data); // Update state with fetched equipment
      } catch (error) {
        console.error("An error occurred while fetching equipment", error);
      }
    };

    fetchEquipment();
  }, []);

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [buttonValue, setButtonValue] = useState<string[]>([]);
  const [buttonId, setButtonId] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState(1); //currentPageが現在のページ番号
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // プラスボタンを押したときに呼ばれる関数
  const handleButtonClick = async (id: number, value: string) => {
    // 非同期処理を挿入（例: APIコールやタイムアウトなど）
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5秒待つ

    if (!buttonId.includes(id)) {
      setButtonValue([...buttonValue, value]);
      setButtonId([...buttonId, id]);
      setIsSidebarOpen(true);
    }
  };

  const handleRemoveValue = (index: number) => {
    const newButtonValue = [...buttonValue];
    const newButtonId = [...buttonId];
    console.log(index);
    newButtonValue.splice(index, 1); // 指定したインデックスの値を削除
    newButtonId.splice(index, 1);
    setButtonValue(newButtonValue);
    setButtonId(newButtonId);

    // 配列が空になった場合、サイドバーを閉じる
    if (newButtonValue.length === 0) {
      setIsSidebarOpen(false);
    }
  };

  const qrRegister = () => {
    console.log(buttonValue);
    console.log(buttonId);
  };

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
      <Paper elevation={0} sx={{ width: "70%", margin: "auto" }}>
        <TableContainer className="tablecontainer">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell className="table_txt">備品id</TableCell>
                <TableCell className="table_txt">備品名</TableCell>
                <TableCell className="table_txt">返却期限</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.lost_status ? (
                      <div className="blue_circle">紛失中</div>
                    ) : item.active_flag ? (
                      <div className="green_circle">貸出可</div>
                    ) : (
                      <div className="red_circle">貸出中</div>
                    )}
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
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
                  <TableCell>
                    <IconButton
                      onClick={() => handleButtonClick(item.id, item.name)}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Pagination
        count={Math.ceil(data.length / ITEMS_PER_PAGE)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        className="paginate"
      />
      {/* サイドバー */}
      {isSidebarOpen && (
        <div className="sidebar">
          <h2>QRコード生成リスト</h2>
          {buttonValue.map((value, index) => (
            <div key={index} className="sidebar_content">
              <p>{value}</p>
              <IconButton
                onClick={() => handleRemoveValue(index)}
                className="sidebar_button"
              >
                <ClearIcon />
              </IconButton>
            </div>
          ))}
          <Button onClick={qrRegister} variant="outlined">
            QR登録
          </Button>
        </div>
      )}
    </div>
  );
}

export default EquipmentList;
