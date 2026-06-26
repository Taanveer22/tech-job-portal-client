import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import useAxiosCommon from '../hooks/useAxiosCommon';

const HrPublishedJobs = () => {
  const axiosCommon = useAxiosCommon();
  const { user } = useContext(AuthContext);
  const [postedJobs, setPostedJobs] = useState([]);

  const handleDeletePostedJob = (id) => {
    // console.log(id);
    axiosCommon
      .delete(`/jobs/remove/${id}`)
      .then((res) => {
        // console.log(res.data);
        if (res?.data?.deletedCount > 0) {
          const remaining = postedJobs.filter((jobItem) => jobItem._id !== id);
          setPostedJobs(remaining);
          toast.warning('deleted job completely');
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response?.data?.message || 'Failed to delete jobs');
      });
  };

  useEffect(() => {
    axiosCommon
      .get(`/jobs?email=${user?.email}`)
      .then((res) => {
        // console.log(res.data);
        setPostedJobs(res.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response?.data?.message || 'Failed to load published jobs');
      });
  }, [user?.email]);
  // console.log(postedJobs);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-4">
        Hr Published Jobs Total : {postedJobs.length}
      </h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Job Title</th>
              <th>Application Count</th>
              <th>Application Review</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {postedJobs.map((jobItem, index) => (
              <tr key={jobItem._id}>
                <td>{index + 1}</td>
                <td>{jobItem?.title}</td>
                <td>{jobItem?.applicationCount}</td>
                <td>
                  <Link to={`/applications/review/${jobItem._id}`}>
                    <button className="btn btn-sm btn-link">Click to see</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeletePostedJob(jobItem?._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HrPublishedJobs;
