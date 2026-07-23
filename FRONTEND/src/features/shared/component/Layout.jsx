// features/shared/component/Layout.jsx
import { Outlet } from "react-router";
import Nav from "./Nav"; // apna path adjust karo

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;