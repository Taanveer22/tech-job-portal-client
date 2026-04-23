import { useContext } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const JobApply = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const { id } = useParams();
  console.log(id);

  const handleJobApplicationForm = (e) => {
    e.preventDefault();
    const linkedin = e.target.linkedin.value;
    const github = e.target.github.value;
    const resume = e.target.resume.value;
    // console.log(linkedin, github, resume);

    const jobInfo = {
      applicant_email: user?.email,
      job_id: id,
      linkedin,
      github,
      resume,
    };

    fetch(`http://localhost:5000/application/apply/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Applied job successfully");
        }
      });
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleJobApplicationForm}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Linkedin</label>
          <input
            name="linkedin"
            type="url"
            className="input"
            placeholder="Linkedin"
          />

          <label className="label">Github</label>
          <input
            name="github"
            type="url"
            className="input"
            placeholder="Github"
          />

          <label className="label">Resume</label>
          <input
            name="resume"
            type="url"
            className="input"
            placeholder="Resume"
          />

          <button className="btn btn-info mt-4">Apply Now</button>
        </fieldset>
      </form>
    </div>
  );
};

export default JobApply;
