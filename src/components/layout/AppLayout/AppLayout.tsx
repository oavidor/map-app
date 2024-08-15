import { ReactNode, FC, memo } from "react";
import Header from "./Header";
import styles from "./AppLayout.module.css";

interface LayoutProps {
  children: ReactNode;
}

let AppLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.layout}>{children}</div>
    </div>
  );
};

AppLayout = memo(AppLayout);

export default AppLayout;
