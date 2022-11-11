import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="px-4">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
