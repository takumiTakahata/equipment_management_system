import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import "../components/loan_approval.css";
import Header from "./header";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";

interface LoanApprovalData {
  application_id: string;
  course_id: number;
  course_name: string;
  deadline: string;
  product_id: number;
  product_name: string;
  school_year: number;
  user_id: number;
  username: string;
  thread_key: string;
}

function LoanApproval() {
  const [loanData, setLoanData] = useState<LoanApprovalData | null>(null);

  const fetchLoanApproval = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      console.error("ID not found in URL");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/loan_approval/?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch request failed:", errorText);
        throw new Error("Network response was not ok");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("Expected JSON but received:", errorText);
        throw new Error("Received non-JSON response");
      }

      const data: LoanApprovalData = await response.json();
      console.log("Fetch successful:", data);

      // loanDataを状態に保存
      setLoanData(data);
    } catch (error) {
      console.error("Fetch request failed:", error);
    }
  };

  useEffect(() => {
    fetchLoanApproval();
  }, []);

  const handleApproval = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("Access token not found");
      return;
    }

    let userId: string | null = null;
    try {
      const decoded = jwtDecode<JwtPayload & { user_id?: string }>(token);
      userId = decoded.user_id || null;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return;
    }

    if (!userId) {
      console.error("User ID not found in token");
      return;
    }

    const applicationId = loanData?.application_id; // ここで適切なapplicationのIDを設定してください

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/application/${applicationId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            thread_key: loanData?.thread_key,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Approval request failed:", errorText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Approval successful:", data);
    } catch (error) {
      console.error("Approval request failed:", error);
    }
  };

  if (!loanData) {
    return <div>Loading...</div>;
  }

  return (
    <div id="loan_approval">
      <Header />
      <h2 className="loan_approval_title">貸出承認ページ</h2>
      <Card className="card" variant="outlined">
        <div className="flex">
          <p className="loan_title">名前</p>
          <p className="loan_text">{loanData.username}</p>
        </div>
        <div className="flex">
          <p className="loan_title">学科</p>
          <p className="loan_text">{loanData.course_name}</p>
        </div>
        <div className="flex">
          <p className="loan_title">学年</p>
          <p className="loan_text">{loanData.school_year}年</p>
        </div>
        <div className="flex">
          <p className="loan_title">返却期限</p>
          <p className="loan_text">{loanData.deadline}</p>
        </div>
        <div className="flex">
          <p className="loan_title">備品の名前</p>
          <p className="loan_text">{loanData.product_name}</p>
        </div>
      </Card>
      <div className="loan_button">
        <Button variant="outlined" className="loan_cancel_btn">
          キャンセル
        </Button>
        <Button
          variant="outlined"
          className="loan_apploval_btn"
          onClick={handleApproval}
        >
          承認
        </Button>
      </div>
    </div>
  );
}

export default LoanApproval;
