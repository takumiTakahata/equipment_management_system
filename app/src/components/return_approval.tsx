import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import "../components/return_approval.css";
import Header from "./header";

function ReturnApproval() {
  return (
    <div id="return_approval">
      <Header />
      <h2 className="return_approval_title">返却承認</h2>
      <Card className="card" variant="outlined">
        <div className="return_flex">
          <p className="return_title">名前</p>
          <p className="return_text">藤原頼希</p>
        </div>
        <div className="return_flex">
          <p className="return_title">学科</p>
          <p className="return_text">高度情報工学科</p>
        </div>
        <div className="return_flex">
          <p className="return_title">学科</p>
          <p className="return_text">3年</p>
        </div>
        <div className="return_flex">
          <p className="return_title">返却期限</p>
          <p className="return_text">2024/8/31</p>
        </div>
        <div className="return_flex">
          <p className="return_title">備品の名前</p>
          <p className="return_text">
            いちばんやさしいITパスポート絶対合格の教科書
          </p>
        </div>
      </Card>
      <div className="return_app_button">
        <Button variant="outlined" className="cancel_re_btn">
          キャンセル
        </Button>
        <Button variant="outlined" className="return_approval_btn">
          承認
        </Button>
      </div>
    </div>
  );
}

export default ReturnApproval;
