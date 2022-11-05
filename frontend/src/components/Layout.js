import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col" style={{ minHeight: "100vh" }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
