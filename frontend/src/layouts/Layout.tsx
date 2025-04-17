import React from "react";
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";

// interface LayoutProps {
//   children: React.ReactNode;
// }
const SIDE_WIDTH = 320;

const Layout = () => {
  return (
    <div>
      <SideMenu width={SIDE_WIDTH} />
      <main style={{ marginLeft: SIDE_WIDTH }}>
        {/* {children} */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
