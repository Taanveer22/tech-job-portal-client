import { createBrowserRouter } from 'react-router';
import HotJobCardDetails from '../components/HotJobCardDetails';
import HrReviewApplications from '../components/HrReviewApplications';
import MyJobApply from '../components/MyJobApply';
import Spinner from '../components/Spinner';
import Root from '../layouts/Root';
import Home from '../pages/Home';
import HrAddJob from '../pages/HrAddJob';
import HrPublishedJobs from '../pages/HrPublishedJobs';
import MyApplications from '../pages/MyApplications';
import Register from '../pages/Register';
import Signin from '../pages/Signin';
import PrivateRoutes from './PrivateRoutes';

let router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    hydrateFallbackElement: <Spinner />,
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
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/details/${params.id}`),
      },
      {
        path: '/applications/apply/:id',
        element: (
          <PrivateRoutes>
            <MyJobApply></MyJobApply>
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
        path: '/jobs/add',
        element: (
          <PrivateRoutes>
            <HrAddJob></HrAddJob>
          </PrivateRoutes>
        ),
      },
      {
        path: '/jobs/publish',
        element: (
          <PrivateRoutes>
            <HrPublishedJobs></HrPublishedJobs>
          </PrivateRoutes>
        ),
      },

      {
        path: '/applications/review/:jobId',
        element: (
          <PrivateRoutes>
            <HrReviewApplications></HrReviewApplications>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/applications/review/${params.jobId}`),
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
