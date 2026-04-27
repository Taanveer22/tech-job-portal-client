import { useContext } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const HrAddJob = () => {
  const { user } = useContext(AuthContext);

  const handleAddJobForm = (e) => {
    e.preventDefault();
    const wholeFormData = new FormData(e.target);
    // console.log(wholeFormData);
    const initialFormData = Object.fromEntries(wholeFormData.entries());
    // console.log(initialFormData);
    const { min, max, currency, ...restFormData } = initialFormData;
    // console.log(restFormData, min, max, currency);
    restFormData.salaryRange = { min, max, currency };
    // console.log(restFormData);
    restFormData.requirements = restFormData.requirements.split('\n');
    restFormData.responsibilities = restFormData.responsibilities.split('\n');
    console.log(restFormData);

    fetch(`http://localhost:5000/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success('Job data added successfully');
        }
      });
  };

  return (
    <div className="w-11/12 sm:w-3/4 mx-auto">
      <form onSubmit={handleAddJobForm}>
        <fieldset className="fieldset">
          {/* title */}
          <label className="label">Job Title</label>
          <input name="title" type="text" className="input w-full" placeholder="Title" />

          {/* location */}
          <label className="label">Job Location</label>
          <input name="location" type="text" className="input w-full" placeholder="Location" />

          {/* job type */}
          <label className="label">Job Type</label>
          <input
            name="jobType"
            type="text"
            className="input w-full"
            placeholder="Type"
            list="types"
          />
          <datalist id="types">
            <option value="Remote"></option>
            <option value="Hybrid"></option>
            <option value="On Site"></option>
          </datalist>

          {/* job category */}
          <label className="label">Job Category</label>
          <input
            name="category"
            type="text"
            className="input w-full"
            placeholder="Category"
            list="categories"
          />
          <datalist id="categories">
            <option value="Engineering"></option>
            <option value="Marketing"></option>
            <option value="Banking"></option>
          </datalist>

          {/* company_name */}
          <label className="label">Company Name</label>
          <input name="company" type="text" className="input w-full" placeholder="Company" />

          {/* company_logo */}
          <label className="label">Company Logo</label>
          <input name="company_logo" type="url" className="input w-full" placeholder="Logo" />

          {/* status */}
          <label className="label">Status</label>
          <input name="status" type="text" className="input w-full" placeholder="Status" />

          {/* salary range */}
          <label className="label">Salary Range</label>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <input name="min" type="number" className="input w-full" placeholder="Min" />
            <input name="max" type="number" className="input w-full" placeholder="Max" />
            <div>
              <input
                name="currency"
                type="text"
                className="input w-full"
                placeholder="Currency"
                list="currencies"
              />
              <datalist id="currencies">
                <option value="BDT"></option>
                <option value="RIAL"></option>
                <option value="DINAR"></option>
              </datalist>
            </div>
          </div>

          {/* description */}
          <fieldset className="fieldset">
            <div className="label">Job Description</div>
            <textarea
              name="description"
              className="textarea h-24 w-full"
              placeholder="Description"
            ></textarea>
          </fieldset>

          {/* requirements */}
          <fieldset className="fieldset">
            <div className="label">Job Requirements</div>
            <textarea
              name="requirements"
              className="textarea h-24 w-full"
              placeholder="Give one requirements in a line"
            ></textarea>
          </fieldset>

          {/* responsibilities */}
          <fieldset className="fieldset">
            <div className="label">Job Responsibilities</div>
            <textarea
              name="responsibilities"
              className="textarea h-24 w-full"
              placeholder="Give one responsibilities in a line"
            ></textarea>
          </fieldset>

          {/* hr email */}
          <label className="label">HR Email</label>
          <input
            defaultValue={user?.email}
            name="hr_email"
            type="email"
            className="input w-full"
            placeholder="Email"
          />

          {/* hr name */}
          <label className="label">HR Name</label>
          <input name="hr_name" type="text" className="input w-full" placeholder="Name" />

          {/* deadline */}
          <label className="label">Application Deadline</label>
          <input name="applicationDeadline" type="date" className="input w-full" />

          {/* submit */}
          <button className="btn btn-neutral mt-4">Add Job</button>
        </fieldset>
      </form>
    </div>
  );
};

export default HrAddJob;

// title
// location
// jobType
// category
// applicationDeadline
// salaryRange
// description
// company
// requirements
// responsibilities
// status
// hr_email
// hr_name
// company_logo
