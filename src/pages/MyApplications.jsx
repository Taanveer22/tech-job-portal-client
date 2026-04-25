import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [apps, setApps] = useState([]);

  const handleDeleteApplication = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/applications/me/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          const remainingApps = apps.filter((appItem) => appItem._id !== id);
          setApps(remainingApps);
          toast.warning('Application deleted successfully');
        }
      });
  };

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/applications/me?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setApps(data));
  }, [user?.email]);
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
