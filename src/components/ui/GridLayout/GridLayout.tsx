import { FC, memo, ReactNode } from "react";
import { Box } from "@mui/material";
import styles from "./GridLayout.module.css";

/**
 * GridLayout - A layout component that arranges its children in a grid structure.
 * 
 * This component uses a CSS grid to organize its children into columns. The number of columns
 * for the main view can be customized through the `mainViewColumns` prop.
 * 
 * @param {number} [mainViewColumns=2] - The number of columns allocated for the main view.
 * @param {ReactNode} children - The content to be displayed within the grid layout.
 * 
 * @example
 *   <GridLayout mainViewColumns={4}>
 *     <Sidebar />
 *     <MainContent />
 *   </GridLayout>
 */

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
