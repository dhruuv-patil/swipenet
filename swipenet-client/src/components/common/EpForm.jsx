import { useState } from "react";
import axios from "axios";

export default function EmployerProfileForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    location: "",
    description: "",
    logo: "",
    website: "",
    linkedin: "",
    jobs: [
      { title: "", skillsRequired: "", type: "Internship", stipendOrSalary: "", description: "" },
    ],
  });

  // Handle simple input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle dynamic array inputs (jobs)
  const handleArrayChange = (index, e) => {
    const updatedJobs = [...formData.jobs];
    updatedJobs[index][e.target.name] = e.target.value;
    setFormData({ ...formData, jobs: updatedJobs });
  };

  const addJob = () => {
    setFormData({
      ...formData,
      jobs: [...formData.jobs, { title: "", skillsRequired: "", type: "Internship", stipendOrSalary: "", description: "" }],
    });
  };

  const removeJob = (index) => {
    const updatedJobs = [...formData.jobs];
    updatedJobs.splice(index, 1);
    setFormData({ ...formData, jobs: updatedJobs });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // JWT token
      // Convert skillsRequired string to array
      const payload = {
        ...formData,
        jobs: formData.jobs.map((job) => ({
          ...job,
          skillsRequired: job.skillsRequired.split(",").map((s) => s.trim()),
        })),
      };
      const res = await axios.post("/profile/employer", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Employer profile created:", res.data);
      alert("Employer profile created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Employer Profile</h2>

      <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="input" required />
      <input name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" className="input" required />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="input" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input" required />
      <input name="logo" value={formData.logo} onChange={handleChange} placeholder="Logo URL" className="input" />
      <input name="website" value={formData.website} onChange={handleChange} placeholder="Website" className="input" />
      <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="input" />

      <h3 className="font-semibold">Job Posts</h3>
      {formData.jobs.map((job, index) => (
        <div key={index} className="space-y-1 border p-2 rounded">
          <input name="title" value={job.title} onChange={(e) => handleArrayChange(index, e)} placeholder="Job Title" className="input" required />
          <input name="skillsRequired" value={job.skillsRequired} onChange={(e) => handleArrayChange(index, e)} placeholder="Skills Required (comma separated)" className="input" required />
          <select name="type" value={job.type} onChange={(e) => handleArrayChange(index, e)} className="input">
            <option>Internship</option>
            <option>Full-time</option>
            <option>Part-time</option>
          </select>
          <input name="stipendOrSalary" value={job.stipendOrSalary} onChange={(e) => handleArrayChange(index, e)} placeholder="Stipend / Salary" className="input" />
          <textarea name="description" value={job.description} onChange={(e) => handleArrayChange(index, e)} placeholder="Job Description" className="input" />
          <button type="button" onClick={() => removeJob(index)} className="btn-red">Remove Job</button>
        </div>
      ))}
      <button type="button" onClick={addJob} className="btn">Add Job</button>

      <button type="submit" className="btn-green">Create Profile</button>
    </form>
  );
}

