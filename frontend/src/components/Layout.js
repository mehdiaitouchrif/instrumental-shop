import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col" style={{ minHeight: "110vh" }}>
      <ToastContainer />
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
