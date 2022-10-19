import "./Layout.css";
import Cells from "./Cells";

function Layout() {
  return (
    <div className="background">
      <div className="layout">
        <Cells />
        <Cells />
        <Cells />
      </div>
    </div>
  );
}

export default Layout;
