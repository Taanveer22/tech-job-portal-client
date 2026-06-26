import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  // console.log(user);
  // console.log(user?.email);
  // console.log(user?.providerData?.[0]?.email);

  const [apps, setApps] = useState([]);

  const handleDeleteApplication = (id) => {
    // console.log(id);
    axiosSecure
      .delete(`/applications/remove/${id}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
          const remainingApps = apps.filter((appItem) => appItem._id !== id);
          setApps(remainingApps);
          toast.success('Application deleted done');
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response?.data?.message || 'Failed to delete applications');
      });
  };

  useEffect(() => {
    const userEmail = user?.email || user?.providerData?.[0]?.email;
    if (!userEmail) {
      toast.warning('No user email found');
      return;
    }

    axiosSecure
      .get(`/applications/me?email=${userEmail}`, {
        withCredentials: true,
      })
      .then((res) => setApps(res.data))
      .catch((error) => {
        // console.log(error);
        toast.error(error.response?.data?.message || 'Failed to load applications');
      });
  }, [axiosSecure, user]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-4">
        My Applications Total : {apps.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Job Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((appItem) => (
              <tr key={appItem._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={appItem?.company_logo} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{appItem?.company}</div>
                      <div className="text-sm opacity-50">{appItem?.location}</div>
                    </div>
                  </div>
                </td>
                <td>{appItem?.title}</td>
                <td>{appItem?.jobType}</td>
                <th>
                  <button
                    onClick={() => handleDeleteApplication(appItem?._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
