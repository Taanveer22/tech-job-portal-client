import { createBrowserRouter } from "react-router";
import HotJobCardDetails from "../components/HotJobCardDetails";
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
        element: <Home />,
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);

export default router;
