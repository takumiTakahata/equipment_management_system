import React from "react";
import Header from "./header";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Button from "@mui/material/Button";
import "./category_register.css";

interface FormInputs {
  category_name: string;
}

function CategoryRegister() {
  const [errorFlg, setErrorFlg] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm<FormInputs>();

  //validationエラーが出た時
  const onError = (errors: Object) => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      setErrorFlg(true);
    } else {
      setErrorFlg(false);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = (document.getElementById("category_name") as HTMLInputElement)
      .value;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Handle success
        console.log("Category registered successfully");
      } else {
        // Handle error
        console.error("Failed to register category");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div>
      <Header />
      <h1 className="page_title">カテゴリー登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="カテゴリー"
            className="category_input_text"
            variant="outlined"
          />
          {errorFlg ? (
            <ErrorMessage
              errors={errors}
              name="category_name"
              as="p"
              className="error_message"
            />
          ) : (
            <p className="required_txt">※必須</p>
          )}
        </div>

        <Button type="submit" variant="contained" className="register_button">
          登録
        </Button>
      </form>
    </div>
  );
}

export default CategoryRegister;
