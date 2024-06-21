import * as React from "react";
import { useState } from "react";
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

export default function Footer() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <footer>
        <Box className="bos">
          <BottomNavigation
            className="custom-bottom-navigation"
            showLabels //ラベルが常に表示される
            value={value} //現在選択されているナビゲーションアイテムの値を表す
            onChange={(event, newValue) => {
              setValue(newValue); //ナビが選択されたときに呼び出す関数を示す
            }}
          ></BottomNavigation>
        </Box>
      </footer>
    </div>
  );
}
