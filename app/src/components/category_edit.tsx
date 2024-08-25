import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header";

const CategoryEdit = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("id");
  const categoryName = queryParams.get("name");

  const [name, setName] = useState(categoryName || "");

  useEffect(() => {
    if (categoryName) {
      setName(categoryName);
    }
  }, [categoryName]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://mysite-mczi.onrender.com/api/category/${categoryId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const data = await response.json();
      console.log("Category updated successfully:", data);
    } catch (error) {
      console.error("An error occurred while updating the category", error);
    }
  };

  return (
    <div>
      <h2>カテゴリー編集</h2>
      <Header />
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前: </label>
          <input type="text" value={name} onChange={handleChange} />
        </div>
        <button type="submit">編集</button>
      </form>
    </div>
  );
};

export default CategoryEdit;
