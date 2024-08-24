import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import "../components/loan_approval.css";
import Header from "./header";

function LoanApproval() {
  return (
    <div id="loan_approval">
      <Header />
      <h2 className="loan_approval_title">貸出承認ページ</h2>
      <Card className="card" variant="outlined">
        <div className="flex">
          <p className="loan_title">名前</p>
          <p className="loan_text">藤原頼希</p>
        </div>
        <div className="flex">
          <p className="loan_title">学科</p>
          <p className="loan_text">高度情報工学科</p>
        </div>
        <div className="flex">
          <p className="loan_title">学科</p>
          <p className="loan_text">3年</p>
        </div>
        <div className="flex">
          <p className="loan_title">返却期限</p>
          <p className="loan_text">2024/8/31</p>
        </div>
        <div className="flex">
          <p className="loan_title">備品の名前</p>
          <p className="loan_text">
            いちばんやさしいITパスポート絶対合格の教科書
          </p>
        </div>
      </Card>
      <div className="loan_button">
        <Button variant="outlined" className="loan_cancel_btn">
          キャンセル
        </Button>
        <Button variant="outlined" className="loan_apploval_btn">
          承認
        </Button>
      </div>
    </div>
  );
}

export default LoanApproval;
