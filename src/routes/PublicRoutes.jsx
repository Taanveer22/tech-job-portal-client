import { createBrowserRouter } from 'react-router';
import HotJobCardDetails from '../components/HotJobCardDetails';
import JobApply from '../components/JobApply';
import Root from '../layouts/Root';
import Home from '../pages/Home';
import HrAddJob from '../pages/HrAddJob';
import MyApplications from '../pages/MyApplications';
import Register from '../pages/Register';
import Signin from '../pages/Signin';
import PrivateRoutes from './PrivateRoutes';

let router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/jobs/details/:id',
        element: (
          <PrivateRoutes>
            <HotJobCardDetails></HotJobCardDetails>
          </PrivateRoutes>
        ),
        loader: ({ params }) => fetch(`http://localhost:5000/jobs/details/${params.id}`),
      },
      {
        path: '/jobs/add',
        element: <HrAddJob></HrAddJob>,
      },
      {
        path: '/applications/apply/:id',
        element: (
          <PrivateRoutes>
            <JobApply></JobApply>
          </PrivateRoutes>
        ),
      },
      {
        path: '/applications/me',
        element: (
          <PrivateRoutes>
            <MyApplications></MyApplications>
          </PrivateRoutes>
        ),
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/signin',
        element: <Signin></Signin>,
      },
    ],
  },
]);

export default router;
