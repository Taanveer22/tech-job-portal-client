import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <>
      <div className="mb-8 lg:mb-16">
        <Navbar />
      </div>

      <div className="mb-8 lg:mb-16">
        <Outlet />
      </div>

      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default Root;
