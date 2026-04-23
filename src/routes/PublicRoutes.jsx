import { createBrowserRouter } from "react-router";
import HotJobCardDetails from "../components/HotJobCardDetails";
import JobApply from "../components/JobApply";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Signin from "../pages/Signin";
import PrivateRoutes from "./PrivateRoutes";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/jobs/details/:id",
        element: (
          <PrivateRoutes>
            <HotJobCardDetails></HotJobCardDetails>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/details/${params.id}`),
      },
      {
        path: "/application/apply/:id",
        element: (
          <PrivateRoutes>
            <JobApply></JobApply>
          </PrivateRoutes>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/signin",
        element: <Signin></Signin>,
      },
    ],
  },
]);

export default router;
