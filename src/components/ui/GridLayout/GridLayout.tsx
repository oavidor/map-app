import { FC, memo, ReactNode } from "react";
import { Box } from "@mui/material";

interface LayoutProps {
  readonly mainViewColumns?: number;
  readonly children?: ReactNode;
}

let GridLayout: FC<LayoutProps> = ({ children, mainViewColumns = 2 }) => (
  <Box
    sx={{ display: "grid", flex: "1%" }}
    className="grid flex-1 scrollable-children"
    gridTemplateColumns={`1fr ${mainViewColumns}fr`}
  >
    {children}
  </Box>
);

GridLayout = memo(GridLayout);

export default GridLayout;
