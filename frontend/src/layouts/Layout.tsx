import React from "react";
import SideMenu from "./SideMenu";

interface LayoutProps {
  children: React.ReactNode;
}
const SIDE_WIDTH = 320;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <SideMenu width={SIDE_WIDTH} />
      <main style={{ marginLeft: SIDE_WIDTH }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
