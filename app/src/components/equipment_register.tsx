import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";
import { TextField, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import "./equipment_register.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

interface Category {
  id: number;
  name: string;
}

const EquipmentRegister = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categories_id, setcategories_id] = useState<number | null>(null);
  const [ISBN, setIsbn] = useState("");
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isBook, setIsBook] = useState(false);

  useEffect(() => {
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setcategories_id(value);
  };

  const handleIsbnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsbn(value);
  };

  const fetchBookName = async (isbn: string) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    console.log("Request URL:", url);

    try {
      const response = await axios.get(url);
      console.log("Response data:", response.data);
      if (response.data.totalItems === 0) {
        throw new Error("本が見つかりませんでした");
      }
      const bookData = response.data.items[0].volumeInfo;
      console.log(bookData);
      console.log(bookData.title);
      if (bookData && bookData.title) {
        return bookData.title;
      } else {
        throw new Error("本が見つかりませんでした");
      }
    } catch (error) {
      console.error("APIリクエスト中にエラーが発生しました:", error);
      return "エラーが発生しました";
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(Number(e.target.value));
  };

  const handleSubmitForBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categories_id === null) {
      alert("カテゴリーを選択してください。");
      return;
    }
    setIsBook(true);
    setOpenDialog(true);
  };

  const handleSubmitForOther = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categories_id === null) {
      alert("カテゴリーを選択してください。");
      return;
    }
    setIsBook(false);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = async () => {
    setOpenDialog(false);
    if (isBook) {
      const bookName = await fetchBookName(ISBN);
      console.log(bookName);

      try {
        const response = await fetch(
          "https://mysite-mczi.onrender.com/api/equipment/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ISBN,
              name: bookName,
              categories_id,
              deadline,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          // throw new Error(`Failed to register equipment: ${errorText}`);
          window.location.href = "/equipment_list?message=登録が失敗しました！";
        }

        const data = await response.json();
        console.log("Equipment registered successfully:", data);
        window.location.href = "/equipment_list?message=登録が成功しました！";
      } catch (error) {
        console.error("An error occurred:", error);
        window.location.href = "/failure?message=登録に失敗しました。";
      }
    } else {
      try {
        console.log(categories_id, name, deadline);
        const response = await fetch(
          "https://mysite-mczi.onrender.com/api/equipment/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ISBN: null,
              name,
              categories_id,
              deadline,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to register equipment: ${errorText}`);
        }

        const data = await response.json();
        console.log("Equipment registered successfully:", data);
        setName("");
        window.location.href = "/equipment_list?message=登録が成功しました！";
      } catch (error) {
        console.error("An error occurred:", error);
        window.location.href = "/equipment_list?message=登録が失敗しました。";
      }
    }
  };

  return (
    <div id="equipment_register">
      <Header />
      {categories_id === 1 ? (
        <form onSubmit={handleSubmitForBook}>
          <div className="register_pulldown">
            <TextField
              select
              label="カテゴリー"
              value={categories_id ?? ""}
              onChange={handleCategoryChange}
              fullWidth
            >
              <MenuItem value="" disabled>
                選択してください
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="equipment_register_text">
            <TextField
              label="ISBN"
              type="text"
              id="isbn"
              value={ISBN}
              onChange={handleIsbnChange}
              fullWidth
            />
          </div>
          <div className="register_pulldown">
            <TextField
              select
              label="期限"
              value={deadline ?? ""}
              onChange={handleDeadlineChange}
              fullWidth
            >
              <MenuItem value="" disabled>
                選択してください
              </MenuItem>
              <MenuItem value={31}>1カ月</MenuItem>
              <MenuItem value={62}>2カ月</MenuItem>
              <MenuItem value={93}>3カ月</MenuItem>
              <MenuItem value={186}>6カ月</MenuItem>
              <MenuItem value={365}>1年</MenuItem>
            </TextField>
          </div>
          <Button
            type="submit"
            variant="outlined"
            className="equipment_register_button"
          >
            登録
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmitForOther}>
          <div className="register_pulldown">
            <TextField
              select
              label="カテゴリー"
              value={categories_id ?? ""}
              onChange={handleCategoryChange}
              fullWidth
            >
              <MenuItem value="" disabled>
                選択してください
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="equipment_register_text">
            <TextField
              label="名前"
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              fullWidth
            />
          </div>
          <div className="register_pulldown">
            <TextField
              select
              label="期限"
              value={deadline ?? ""}
              onChange={handleDeadlineChange}
              fullWidth
              className="register_pulldown"
            >
              <MenuItem value="" disabled>
                選択してください
              </MenuItem>
              <MenuItem value={31}>1カ月</MenuItem>
              <MenuItem value={62}>2カ月</MenuItem>
              <MenuItem value={93}>3カ月</MenuItem>
              <MenuItem value={186}>6カ月</MenuItem>
              <MenuItem value={365}>1年</MenuItem>
            </TextField>
          </div>
          <Button
            type="submit"
            variant="outlined"
            className="equipment_register_button"
          >
            登録
          </Button>
        </form>
      )}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        className="equipment_register_popup"
      >
        <DialogTitle className="popup_title">
          入力された項目が正しいか確認してください
        </DialogTitle>
        <DialogContent>
          <DialogContentText>カテゴリー </DialogContentText>
          <p className="popup_text">
            {categories.find((category) => category.id === categories_id)?.name}
          </p>

          {isBook ? (
            <>
              <DialogContentText>ISBN</DialogContentText>
              <p className="popup_text">{ISBN}</p>
            </>
          ) : (
            <>
              <DialogContentText>名前</DialogContentText>
              <p className="popup_text">{name}</p>
            </>
          )}
          <DialogContentText>期限</DialogContentText>
          <p className="popup_text">
            {deadline === 31
              ? "1カ月"
              : deadline === 62
              ? "2カ月"
              : deadline === 93
              ? "3カ月"
              : deadline === 186
              ? "6カ月"
              : deadline === 365
              ? "1年"
              : `${deadline}日`}
          </p>
        </DialogContent>
        <DialogActions className="popup_button">
          <Button
            onClick={handleDialogClose}
            color="primary"
            className="popup_equipment_cancel_button"
          >
            キャンセル
          </Button>
          <Button
            onClick={handleDialogConfirm}
            color="primary"
            className="popup_equipment_register_button"
          >
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EquipmentRegister;
