import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";

const SIDE_WIDTH = 240;

const Layout = () => {
  return (
    <div>
      <SideMenu width={SIDE_WIDTH} />
      <main style={{ marginLeft: SIDE_WIDTH }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
