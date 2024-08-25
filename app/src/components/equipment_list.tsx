import React, { useState, useEffect, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import "./equipment_list.css";
import Header from "./header";

interface Equipment {
  id: number; // 備品ID
  categories_id: number; // カテゴリーID
  name: string; // 備品名
  deadline: string; // 返却期限
  lost_status: boolean; // 紛失ステータス
  active_flag: boolean; // アクティブフラグ
}

interface Category {
  id: number;
  name: string;
}

const ITEMS_PER_PAGE = 5;

function EquipmentList() {
  const [data, setEquipment] = useState<Equipment[]>([]);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | string>(
    "すべて"
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("すべて");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [buttonValue, setButtonValue] = useState<string[]>([]);
  const [buttonId, setButtonId] = useState<number[]>([]);
  const [nameSearch, setNameSearch] = useState("");
  const [searchItems, setSearchItems] = useState<Equipment[]>([]);
  const [pageCount, setPageCount] = useState(0); // ページ数を管理する状態
  const [currentPage, setCurrentPage] = useState(1); //currentPageが現在のページ番号
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
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
          throw new Error("Failed to fetch equipment");
        }

        const result = await response.json();
        setEquipment(result); // Update state with fetched equipment
        setPageCount(Math.ceil(result.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("An error occurred while fetching equipment", error);
      }
    };

    fetchEquipment();

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://mysite-mczi.onrender.com/api/category/",
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
        setCategories(data);
      } catch (error) {
        console.error("An error occurred while fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSearch = () => {
    const filterItems = data.filter((item) => {
      const matchesName = item.name
        .toLowerCase()
        .includes(nameSearch.toLowerCase());
      const matchesCategory =
        selectedCategory === "すべて" ||
        item.categories_id === selectedCategory;
      const matchesStatus =
        selectedStatus === "すべて" ||
        (selectedStatus === "貸出可" &&
          item.active_flag &&
          !item.lost_status) ||
        (selectedStatus === "貸出中" &&
          !item.active_flag &&
          !item.lost_status) ||
        (selectedStatus === "紛失中" && item.lost_status);
      return matchesName && matchesCategory && matchesStatus;
    });
    console.log(filterItems);
    setPageCount(
      Math.ceil(
        filterItems.length > 0
          ? filterItems.length / ITEMS_PER_PAGE
          : data.length / ITEMS_PER_PAGE
      )
    );

    if (filterItems.length > 0) {
      setSearchItems(filterItems);
    } else {
      setSearchItems(data);
    }
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems =
    searchItems.length > 0
      ? searchItems.slice(startIndex, startIndex + ITEMS_PER_PAGE)
      : data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // プラスボタンを押したときに呼ばれる関数
  const handleButtonClick = async (
    id: number,
    value: string,
    index: number
  ) => {
    // 非同期処理を挿入（例: APIコールやタイムアウトなど）
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5秒待つ

    if (!buttonId.includes(id)) {
      setButtonValue([...buttonValue, value]);
      setButtonId([...buttonId, id]);
      setIsSidebarOpen(true);
      setTimeout(() => {
        if (buttonRefs.current[index]) {
          buttonRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  const handleRemoveValue = (index: number) => {
    const newButtonValue = [...buttonValue];
    const newButtonId = [...buttonId];
    newButtonValue.splice(index, 1); // 指定したインデックスの値を削除
    newButtonId.splice(index, 1);
    setButtonValue(newButtonValue);
    setButtonId(newButtonId);

    // 配列が空になった場合、サイドバーを閉じる
    if (newButtonValue.length === 0) {
      setIsSidebarOpen(false);
    }
  };

  const qrRegister = async () => {
    try {
      const response = await fetch("https://mysite-mczi.onrender.com/api/qr/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buttonValue: buttonValue,
          buttonId: buttonId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register QR");
      }

      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      console.log("QR登録成功:", pdfUrl);

      navigate("/view_pdf", { state: { pdfUrl } }); // PDFのURLを次のページに渡す
    } catch (error) {
      console.error("QR登録中にエラーが発生しました", error);
    }
  };

  const handleRowClick = (item: Equipment) => {
    navigate(
      `/equipment_edit?id=${item.id}&categories_id=${
        item.categories_id
      }&name=${encodeURIComponent(item.name)}&deadline=${
        item.deadline
      }&lost_status=${item.lost_status}&active_flag=${item.active_flag}`
    );
  };

  return (
    <div id="equipment_list">
      <Header />
      <h2>備品一覧</h2>
      <TextField
        select
        id="outlined-select-currency"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <MenuItem value="すべて">すべて</MenuItem>
        <MenuItem value="貸出可">貸出可</MenuItem>
        <MenuItem value="貸出中">貸出中</MenuItem>
        <MenuItem value="紛失中">紛失中</MenuItem>
      </TextField>
      <TextField
        select
        id="outlined-select-category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <MenuItem value="すべて">すべて</MenuItem>
        {categories.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        placeholder="ITパスポート"
        value={nameSearch}
        onChange={(e) => setNameSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="outlined" onClick={handleSearch}>
        検索
      </Button>
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
              {currentItems.map((item, index) => (
                <TableRow key={item.id} onClick={() => handleRowClick(item)}>
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
                      sx={{ width: 60, height: 60 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleButtonClick(item.id, item.name, index);
                      }}
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
        count={pageCount}
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
            <div
              key={index}
              className="sidebar_content"
              ref={(el) => (buttonRefs.current[index] = el)}
            >
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
            pdf生成
          </Button>
        </div>
      )}
    </div>
  );
}

export default EquipmentList;
