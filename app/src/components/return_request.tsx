import React from "react";
import { ListItem } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import "./return_request.css";

const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("access_token");
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload & { user_id?: string }>(token);
      return decoded.user_id || null;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }
  return null;
};

const handleLendingRequest = async () => {
  const qrResult = JSON.parse(localStorage.getItem("qrresult") || "[]");
  const userId = getUserIdFromToken();

  console.log("qrResult:", qrResult);
  try {
    const response = await fetch(
      "https://mysite-mczi.onrender.com/api/application/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qrResult,
          userId,
          action: "return",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lending request failed:", errorText);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    localStorage.removeItem("qrresult");
  } catch (error) {
    console.error("Lending request failed:", error);
  }
};
// Productインターフェースを定義
interface Product {
  name: string;
  deadline: string;
}

function ReturnRequest() {
  const navigate = useNavigate();
  const [data, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const qrResult = JSON.parse(localStorage.getItem("qrresult") || "[]");
      const userId = getUserIdFromToken();

      try {
        const productDetails = await Promise.all(
          qrResult.map(async (id: number) => {
            const response = await fetch(
              `https://mysite-mczi.onrender.com/api/equipment/${id}/`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch product with ID ${id}`);
            }
            const product = await response.json();
            return {
              name: product.name,
              deadline: product.deadline,
            } as Product;
          })
        );
        setProducts(productDetails);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProducts();
  }, []);

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    const item = data[index];

    if (!item) {
      return null; // itemがundefinedの場合は何もレンダリングしない
    }

    const today = new Date();
    today.setDate(today.getDate() + Number(item.deadline));
    const formattedDate = today.toLocaleDateString();

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton className="list_button">
          <div className="contents">
            <p className="product_name">備品名:</p>
            <p className="name">{item.name}</p>
            <p className="limit">返却期限: {formattedDate}</p>
          </div>
        </ListItemButton>
      </ListItem>
    );
  }

  const handleClose = () => {
    localStorage.removeItem("qrresult");
    navigate("/user_top");
  };
  const continueReading = () => {
    navigate("/qr_reading");
  };

  return (
    <div id="return_request">
      <p className="title">
        選択するものが正しいか<br></br>確認してください
      </p>
      <div className="list">
        <Box
          sx={{
            width: "100%",
            height: 600,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <FixedSizeList
            height={400}
            width={450}
            itemSize={150}
            itemCount={2}
            overscanCount={10}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      </div>
      <div className="button">
        <Button
          className="request_button"
          variant="contained"
          onClick={handleLendingRequest}
        >
          返却申請
        </Button>
      </div>
      <div className="button">
        <Button
          className="continue_button"
          variant="contained"
          color="primary"
          onClick={continueReading}
        >
          続けて読み込む
        </Button>
      </div>
      <div className="button">
        <Button
          className="cancel_button"
          variant="contained"
          onClick={handleClose}
        >
          キャンセル
        </Button>
      </div>
    </div>
  );
}

export default ReturnRequest;
