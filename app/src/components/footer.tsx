import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import "./footer.css";
import List from "@mdi/react";
import { mdiFormatListBulletedSquare } from "@mdi/js";
import Borrow from "@mdi/react";
import { mdiCartPlus } from "@mdi/js";
import Borrowing from "@mdi/react";
import { mdiPlaylistPlus } from "@mdi/js";
import Logout from "@mdi/react";
import { mdiLogout } from "@mdi/js";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const borrowButton = () => {
    navigate("/qr_reading");
  };
  const productList = () => {
    navigate("/product_list");
  };
  const borrowingList = () => {
    navigate("/user_top");
  };
  const logOut = () => {
    navigate("");
  };
  return (
    <div id="footer">
      <footer>
        <Box className="footer_box">
          <BottomNavigation
            className="custom-bottom-navigation"
            showLabels //ラベルが常に表示されるために必要
            value={value} //現在選択されているナビゲーションアイテムの値を表す
            onChange={(event, newValue) => {
              setValue(newValue); // ナビが選択されたときに呼び出される関数を示す
            }}
          >
            <BottomNavigationAction
              className="footer_borrow_button"
              label="備品を借りる" //テキスト
              icon={<Borrow path={mdiCartPlus} />}
              onClick={borrowButton}
            />
            <BottomNavigationAction
              className="footer_list_button"
              label="備品一覧"
              icon={<List path={mdiFormatListBulletedSquare} />}
              onClick={productList}
            />
            <BottomNavigationAction
              className="footer_borrowing_button"
              label="借用品一覧"
              icon={<Borrowing path={mdiPlaylistPlus} />}
              onClick={borrowingList}
            />
            <BottomNavigationAction
              className="footer_logout_button"
              label="ログアウト"
              icon={<Logout path={mdiLogout} />}
              onClick={logOut}
            />
          </BottomNavigation>
        </Box>
      </footer>
    </div>
  );
}
