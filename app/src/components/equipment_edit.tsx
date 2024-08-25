import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header";
import { TextField, Button, MenuItem } from "@mui/material";
import "./equipment_edit.css";
interface Category {
  id: number;
  name: string;
}

const EquipmentEdit = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const equipmentId = queryParams.get("id");
  const equipmentName = queryParams.get("name");
  const equipmentCategory = queryParams.get("categories_id");
  const equipmentStatus = queryParams.get("active_flag");
  const equipmentLostStatus = queryParams.get("lost_status");
  const equipmentDeadline = queryParams.get("deadline");

  const [name, setName] = useState(equipmentName || "");
  const [categories_id, setCategory] = useState(equipmentCategory || "");
  const [active_flag, setActiveFlag] = useState("true");
  const [lost_status, setLostStatus] = useState("false");
  const [deadline, setDeadline] = useState(equipmentDeadline || "");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (equipmentName) {
      setName(equipmentName);
    }
    if (equipmentCategory) {
      setCategory(equipmentCategory);
    }
    if (equipmentStatus) {
      setActiveFlag(equipmentStatus);
    }
    if (equipmentLostStatus) {
      setLostStatus(equipmentLostStatus);
    }
    if (equipmentDeadline) {
      setDeadline(equipmentDeadline);
    }
  }, [
    equipmentName,
    equipmentCategory,
    equipmentStatus,
    equipmentLostStatus,
    equipmentDeadline,
  ]);

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleActiveFlagChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActiveFlag(event.target.value);
  };

  const handleLostStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLostStatus(event.target.value);
  };

  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://mysite-mczi.onrender.com/api/equipment/${equipmentId}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("削除成功:", data);
      } else {
        console.error("削除失敗:", response.statusText);
      }
    } catch (error) {
      console.error("削除失敗:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const requestBody = {
        name,
        categories_id,
        active_flag,
        lost_status,
        deadline,
      };
      console.log("Sending request with body:", requestBody);

      const response = await fetch(
        `https://mysite-mczi.onrender.com/api/equipment/${equipmentId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to update equipment:", errorText);
        throw new Error("Failed to update equipment");
      }

      const data = await response.json();
      console.log("Equipment updated successfully:", data);
    } catch (error) {
      console.error("An error occurred while updating the equipment", error);
    }
  };

  return (
    <div id="equipment_edit">
      <Header />
      <div className="equipment_edit_flex">
        <h2 className="equipment_edit_title">備品編集</h2>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="secondary"
          className="equipment_delete_button"
        >
          削除
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="equipment_edit_text">
          <TextField
            label="備品名"
            value={name}
            onChange={handleNameChange}
            fullWidth
          />
        </div>
        <div className="equipment_edit_text">
          <TextField
            select
            label="カテゴリー"
            value={categories_id}
            onChange={handleCategoryChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="" disabled>
              選択してください
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="equipment_edit_text">
          <TextField
            select
            label="ステータス"
            value={active_flag}
            onChange={handleActiveFlagChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="true">貸出可</MenuItem>
            <MenuItem value="false">貸出中</MenuItem>
          </TextField>
        </div>
        <div className="equipment_edit_text">
          <TextField
            select
            label="貸出状態"
            value={lost_status}
            onChange={handleLostStatusChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="false">正常</MenuItem>
            <MenuItem value="true">紛失中</MenuItem>
          </TextField>
        </div>
        <div className="equipment_edit_text">
          <TextField
            select
            label="返却期限"
            value={deadline}
            onChange={handleDeadlineChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="31">1カ月</MenuItem>
            <MenuItem value="62">2カ月</MenuItem>
            <MenuItem value="93">3カ月</MenuItem>
            <MenuItem value="186">6カ月</MenuItem>
            <MenuItem value="365">1年</MenuItem>
          </TextField>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="equipment_edit_button"
        >
          編集
        </Button>
      </form>
    </div>
  );
};

export default EquipmentEdit;
