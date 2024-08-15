import { FC, memo, ReactNode } from "react";
import { Box } from "@mui/material";
import styles from "./GridLayout.module.css"; // Import the CSS Module

interface LayoutProps {
  readonly mainViewColumns?: number;
  readonly children?: ReactNode;
}

let GridLayout: FC<LayoutProps> = ({ children, mainViewColumns = 2 }) => (
  <Box
    className={styles.gridContainer}
    gridTemplateColumns={`1fr ${mainViewColumns}fr`}
  >
    {children}
  </Box>
);

GridLayout = memo(GridLayout);

export default GridLayout;
