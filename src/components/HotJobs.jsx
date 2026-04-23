import { useEffect, useState } from "react";
import HotJobCard from "./HotJobCard";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/jobs`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-medium mb-4">
        Hot jobs Available : {jobs.length}
      </h1>
      <p className="text-center mb-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
        perspiciatis ipsa totam quasi harum praesentium earum alias at saepe
        officia?
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {jobs.map((jobItem) => (
          <HotJobCard key={jobItem._id} jobItem={jobItem}></HotJobCard>
        ))}
      </div>
    </div>
  );
};

export default HotJobs;
