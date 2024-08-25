import React, { useEffect, useState } from "react";
import { ListItem } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import "./user_top.css";
import Footer from "./footer";
import { jwtDecode, JwtPayload } from "jwt-decode";

function renderRow(applications: any[]) {
  return (props: ListChildComponentProps) => {
    const { index, style } = props;
    const application = applications[index];

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton className="list_button">
          <div className="contents">
            <p className="product_name">備品名:</p>
            <p className="name">{application.product_name}</p>
            <p className="limit">返却期限:{application.deadline}</p>
          </div>
        </ListItemButton>
      </ListItem>
    );
  };
}

function UserTop() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchApplications = async () => {
      const userId = getUserIdFromToken();

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user_top/${userId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("An error occurred while fetching applications", error);
      }
    };

    fetchApplications();
  }, []);
  console.log(applications);

  const borrowButton = () => {
    navigate("/return_qr_reading");
  };

  return (
    <div id="user_top">
      <p className="title">借りている物一覧</p>

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
            itemCount={applications.length}
            overscanCount={10}
          >
            {renderRow(applications)}
          </FixedSizeList>
        </Box>
      </div>
      <div className="button">
        <Button
          className="return_button"
          variant="contained"
          color="primary"
          onClick={borrowButton}
        >
          返却申請へ
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default UserTop;
