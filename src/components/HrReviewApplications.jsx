import { useLoaderData } from 'react-router';
import { toast } from 'react-toastify';

const HrReviewApplications = () => {
  const ReviewedApps = useLoaderData();
  //   console.log(ReviewedApps);

  const handleUpdateStatus = (e, id) => {
    console.log(e.target.value, id);
    const statusData = {
      status: e.target.value,
    };

    fetch(`http://localhost:5000/applications/status/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount) {
          toast.success('Status updated successfully');
        }
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-4">
        Review Applications Available : {ReviewedApps.length}
      </h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Serial</th>
            <th>Applicant Email</th>
            <th>Github</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {ReviewedApps.map((appItem, index) => (
            <tr key={appItem._id}>
              <td>{index + 1}</td>
              <td>{appItem.applicant_email}</td>
              <td>{appItem.github}</td>
              <td>
                <select
                  onChange={(e) => handleUpdateStatus(e, appItem._id)}
                  defaultValue="Small"
                  className="select select-sm"
                >
                  <option disabled={true}>{appItem?.status || 'Change'}</option>
                  <option>hired</option>
                  <option>rejected</option>
                  <option>pending</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HrReviewApplications;
