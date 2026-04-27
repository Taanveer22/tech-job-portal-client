import { useLoaderData } from 'react-router';

const HrReviewApplications = () => {
  const ReviewedApps = useLoaderData();
  console.log(ReviewedApps);

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
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {ReviewedApps.map((appItem, index) => (
            <tr key={appItem._id}>
              <td>{index + 1}</td>
              <td>{appItem.applicant_email}</td>
              <td>{appItem.github}</td>
              <td>{'h'}</td>
              <td>{'h'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HrReviewApplications;
