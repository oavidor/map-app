import { FC, memo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

let Header: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Map App</Typography>
      </Toolbar>
    </AppBar>
  );
};

Header = memo(Header);
export default Header;
