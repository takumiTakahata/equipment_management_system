import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
        const response = await fetch("http://127.0.0.1:8000/api/category/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const handleActiveFlagChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActiveFlag(event.target.value);
  };

  const handleLostStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLostStatus(event.target.value);
  };

  const handleDeadlineChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDeadline(event.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/equipment/${equipmentId}/`,
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
        `http://127.0.0.1:8000/api/equipment/${equipmentId}/`,
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
    <div>
      <h2>備品編集</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>備品名: </label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>カテゴリー: </label>
          <select value={categories_id} onChange={handleCategoryChange}>
            <option value="" disabled>
              選択してください
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>ステータス: </label>
          <select value={active_flag} onChange={handleActiveFlagChange}>
            <option value="true">貸出可</option>
            <option value="false">貸出中</option>
          </select>

          <label>貸出状態: </label>
          <select value={lost_status} onChange={handleLostStatusChange}>
            <option value="false">正常</option>
            <option value="true">紛失中</option>
          </select>
        </div>
        <div>
          <label>返却期限: </label>
          <select value={deadline} onChange={handleDeadlineChange}>
            <option value="31">1カ月</option>
            <option value="62">2カ月</option>
            <option value="93">3カ月</option>
            <option value="186">6カ月</option>
            <option value="365">1年</option>
          </select>
        </div>
        <button type="submit">編集</button>
      </form>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
};

export default EquipmentEdit;
