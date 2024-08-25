import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./header";

interface Category {
  id: number;
  name: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

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
        setCategories(data); // Update state with fetched categories
      } catch (error) {
        console.error("An error occurred while fetching categories", error);
      }
    };

    fetchCategories(); // Call fetchCategories when component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleRowClick = (category: Category) => {
    navigate(
      `/category_edit?id=${category.id}&name=${encodeURIComponent(
        category.name
      )}`
    );
  };

  return (
    <div>
      <h1>Category List</h1>
      <Header />
      <Button variant="outlined">カテゴリー登録</Button>
      <Paper elevation={0} sx={{ width: "70%", margin: "auto" }}>
        <TableContainer className="tablecontainer">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">カテゴリー名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category.id}
                  onClick={() => handleRowClick(category)}
                >
                  <TableCell align="center">{category.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CategoryList;
