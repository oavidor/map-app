import { ReactNode, FC, memo } from "react";
import Header from "./Header";
import "./AppLayout.css";

interface LayoutProps {
  children: ReactNode;
}

let AppLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="layout">{children}</div>
    </div>
  );
};

AppLayout = memo(AppLayout);

export default AppLayout;
