import { useState,useEffect } from "react";
import axios from "axios";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Briefcase, MapPin, Link2, Plus, X, Camera, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { n } from "@clerk/clerk-react/dist/useAuth-CbDfW7Rs";

const EmployerProfileCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    location: "",
    description: "",
    website: "",
    linkedin: "",
  });

  const [logo, setLogo] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
  const fetchEmployerProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/employer-profile/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const profile = res.data; // from controller

      setFormData({
        companyName: profile.companyName || "",
        industry: profile.industry || "",
        location: profile.location || "",
        description: profile.description || "",
        website: profile.website || "",
        linkedin: profile.linkedin || "",
      });

      setLogo(profile.logo || null);
      setJobs(profile.jobs || []);

    } catch (err) {
      console.error("Error fetching employer profile:", err.response?.data || err.message);
    }
  };

  fetchEmployerProfile();
}, []);

  const availableSkills = [
    "React", "Node.js", "JavaScript", "Python", "UI/UX", "Marketing", "Sales", "Finance", "HR"
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(url);
    }
  };

  const addJob = () => {
    const newJob = {
      id: Date.now().toString(),
      title: "",
      type: "",
      skillsRequired: [],
      stipendOrSalary: "",
      description: "",
    };
    setJobs((prev) => [...prev, newJob]);
  };

  const removeJob = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const updateJob = (id, field, value) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, [field]: value } : j))
    );
  };

  const toggleJobSkill = (id, skill) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              skillsRequired: j.skillsRequired.includes(skill)
                ? j.skillsRequired.filter((s) => s !== skill)
                : [...j.skillsRequired, skill],
            }
          : j
      )
    );
  };

 const handleCreateProfile = async () => {
  try {
    const payload = { ...formData, logo, jobs };

    const res = await axios.post(
      "http://localhost:5001/api/employer-profile/create-profile",
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Employer profile saved:", res.data);
    alert(res.data.message);
    navigate("/employer/dashboard"); // Redirect after creation
  } catch (err) {
    console.error("Error saving employer profile:", err.response?.data || err.message);
    alert("Failed to save profile");
  }
  navigate("/employer/dashboard")
};

  return (
    <>
     
      <div className="min-h-screen bg-gradient-to-br from-swipe-navy via-background to-swipe-dark py-8 px-4">
        <input
          id="logoInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoUpload}
        />

        <div className="relative w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-swipe-text-primary mb-2">
              Create Employer Profile
            </h1>
            <p className="text-swipe-text-secondary text-lg">
              Showcase your company and post jobs to find talent
            </p>
          </div>

          <div className="space-y-8">
            {/* Company Info */}
            <Card className="bg-gradient-card border-swipe-border shadow-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-swipe-blue" />
                <h2 className="text-2xl font-bold text-swipe-text-primary">
                  Company Information
                </h2>
              </div>

              <div className="flex flex-col items-center space-y-4 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-primary border-4 border-swipe-border shadow-glow flex items-center justify-center overflow-hidden">
                    {logo ? (
                      <img
                        src={logo}
                        alt="Company Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-12 h-12 text-swipe-text-primary" />
                    )}
                  </div>
                  <Button
                    variant="swipe"
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full"
                    onClick={() =>
                      document.getElementById("logoInput")?.click()
                    }
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-swipe-text-secondary text-sm">
                  Upload company logo
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Industry (e.g., IT, Healthcare)"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, industry: e.target.value }))
                  }
                />
                <Input
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, location: e.target.value }))
                  }
                />
                <Textarea
                  placeholder="About your company"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </Card>

            {/* Job Postings */}
            <Card className="bg-gradient-card border-swipe-border shadow-card p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-swipe-blue" />
                  <h2 className="text-2xl font-bold text-swipe-text-primary">
                    Job Postings
                  </h2>
                </div>
                <Button variant="swipe-outline" onClick={addJob}>
                  <Plus className="w-4 h-4 mr-2" /> Add Job
                </Button>
              </div>

              <div className="space-y-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="relative bg-swipe-dark/50 rounded-lg p-6 border border-swipe-border"
                  >
                    <Button
                      variant="swipe-ghost"
                      size="icon"
                      className="absolute top-4 right-4"
                      onClick={() => removeJob(job.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>

                    <div className="space-y-4">
                      <Input
                        placeholder="Job Title"
                        value={job.title}
                        onChange={(e) =>
                          updateJob(job.id, "title", e.target.value)
                        }
                      />
                      <Select
                        value={job.type}
                        onValueChange={(value) =>
                          updateJob(job.id, "type", value)
                        }
                      >
                        <SelectTrigger className="bg-swipe-dark border-swipe-border text-swipe-text-primary h-12">
                          <SelectValue placeholder="Select Job Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-swipe-dark border-swipe-border">
                          <SelectItem value="Internship">Internship</SelectItem>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="Stipend / Salary"
                        value={job.stipendOrSalary}
                        onChange={(e) =>
                          updateJob(job.id, "stipendOrSalary", e.target.value)
                        }
                      />

                      {/* Skills Selection */}
                      <div className="space-y-2">
                        <label className="text-swipe-text-primary font-medium">
                          Required Skills
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {availableSkills.map((skill) => {
                            const isSelected = job.skillsRequired.includes(
                              skill
                            );
                            return (
                              <div
                                key={skill}
                                onClick={() => toggleJobSkill(job.id, skill)}
                                className={`cursor-pointer p-2 rounded-lg border text-center ${
                                  isSelected
                                    ? "bg-gradient-primary border-swipe-blue"
                                    : "bg-swipe-dark border-swipe-border"
                                }`}
                              >
                                <span
                                  className={`text-sm ${
                                    isSelected
                                      ? "text-swipe-text-primary"
                                      : "text-swipe-text-secondary"
                                  }`}
                                >
                                  {skill}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.skillsRequired.map((s) => (
                            <Badge
                              key={s}
                              className="bg-swipe-blue text-swipe-text-primary cursor-pointer"
                              onClick={() => toggleJobSkill(job.id, s)}
                            >
                              {s} <X className="w-3 h-3 ml-1" />
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Textarea
                        placeholder="Job description"
                        value={job.description}
                        onChange={(e) =>
                          updateJob(job.id, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}

                {jobs.length === 0 && (
                  <div className="text-center text-swipe-text-secondary py-6">
                    No job postings yet. Click "Add Job" to create one.
                  </div>
                )}
              </div>
            </Card>

            {/* Links */}
            <Card className="bg-gradient-card border-swipe-border shadow-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Link2 className="w-6 h-6 text-swipe-blue" />
                <h2 className="text-2xl font-bold text-swipe-text-primary">
                  Links
                </h2>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Company Website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, website: e.target.value }))
                  }
                />
                <Input
                  placeholder="LinkedIn URL"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, linkedin: e.target.value }))
                  }
                />
              </div>
            </Card>

            {/* Action */}
            <div className="flex gap-4 pt-6">
              <Button variant="swipe-outline" className="flex-1">
                Save as Draft
              </Button>
              <Button
                variant="swipe"
                size="lg"
                className="flex-1"
                onClick={handleCreateProfile}
              >
                Create Employer Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerProfileCreation;
