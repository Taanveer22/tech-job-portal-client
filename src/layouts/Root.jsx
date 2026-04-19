import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div className="">
        <Outlet />
      </div>

      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default Root;
