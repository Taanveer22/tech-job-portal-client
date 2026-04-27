import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import AuthContext from '../context/AuthContext';

const HrPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/jobs?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPostedJobs(data);
      });
  }, [user?.email]);
  console.log(postedJobs);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-4">
        Hr Posted Jobs Total : {postedJobs.length}
      </h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Job Title</th>
              <th>Application Deadline</th>
              <th>Application Count</th>
              <th> Applications</th>
            </tr>
          </thead>
          <tbody>
            {postedJobs.map((jobItem, index) => (
              <tr key={jobItem._id}>
                <td>{index + 1}</td>
                <td>{jobItem?.title}</td>
                <td>{jobItem?.applicationDeadline}</td>
                <td>{jobItem?.applicationCount}</td>
                <td>
                  <Link to={`/applications/review/${jobItem._id}`}>
                    <button className="btn btn-sm btn-link">View Applications</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HrPostedJobs;
