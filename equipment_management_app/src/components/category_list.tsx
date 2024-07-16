import React, { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

const Category_list = () => {
  const [categories, setCategories] = useState<Category[]>([]);

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
        setCategories(data); // Update state with fetched categories
      } catch (error) {
        console.error("An error occurred while fetching categories", error);
      }
    };

    fetchCategories(); // Call fetchCategories when component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h1>Category List</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Category_list;
