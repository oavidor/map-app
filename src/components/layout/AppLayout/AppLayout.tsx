import { ReactNode, FC, memo } from "react";
import Header from "./Header";
import styles from "./AppLayout.module.css";

/**
 * AppLayout - A layout component that provides a consistent structure for the application.
 *
 * This component includes a header at the top and a content area below it where children components
 * are rendered. It serves as the main structural component for the app's pages.
 *
 * @param {ReactNode} children - The content to be displayed within the layout, typically the main content of the page.
 *
 * @example
 *   <AppLayout>
 *     <MainContent />
 *   </AppLayout>
 */

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
