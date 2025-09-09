import { useState } from "react";
import { Card } from "../ui/card";
import { Camera, MapPin, Briefcase, GraduationCap, Link2, Plus, X, Upload, CalendarIcon } from "lucide-react";
import {Input  } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar/Navbar";

const JobseekerProfileCreation = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    tagline: "",
    location: "",
    currentRole: "",
    employmentType: "",
    experienceLevel: "",
    portfolioUrl: "",
    linkedinUrl: "",
    lookingFor: "",
    preferredIndustry: "",
  });
  
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [educations, setEducations] = useState([]);

  const availableSkills = [
    "React", "Node.js", "JavaScript", "TypeScript", "Python", "Java", "C++",
    "HTML/CSS", "Vue.js", "Angular", "Django", "Flask", "MongoDB", "PostgreSQL",
    "Docker", "Kubernetes", "AWS", "Azure", "Git", "Figma", "Photoshop"
  ];

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const addWorkExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      startDate: null,
      endDate: null,
      description: ""
    };
    setWorkExperiences(prev => [...prev, newExp]);
  };

  const removeWorkExperience = (id) => {
    setWorkExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const updateWorkExperience = (id, field, value) => {
    setWorkExperiences(prev => prev.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      yearCompleted: ""
    };
    setEducations(prev => [...prev, newEdu]);
  };

  const removeEducation = (id) => {
    setEducations(prev => prev.filter(edu => edu.id !== id));
  };

  const updateEducation = (id, field, value) => {
    setEducations(prev => prev.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) setResume(file);
  };

  const DatePicker = ({ date, onDateChange, placeholder }) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="swipe-outline"
            className={cn(
              "w-full justify-start text-left font-normal h-12",
              !date && "text-swipe-text-secondary"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50 bg-swipe-dark border-swipe-border" align="start">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={onDateChange}
            initialFocus
            className={cn("p-3 pointer-events-auto bg-swipe-dark text-swipe-text-primary")}
          />
        </PopoverContent>
      </Popover>
    );
  };

  const handleSaveDraft = () => {
    console.log("Save draft", { formData, selectedSkills, workExperiences, educations, profileImage, resume });
  };

  const handleCreateProfile = () => {
    // Add validation and API call here
    console.log("Create profile", { formData, selectedSkills, workExperiences, educations, profileImage, resume });
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-swipe-navy via-background to-swipe-dark py-8 px-4">
      {/* Hidden file inputs for uploads */}
      <input id="profileImageInput" type="file" accept="image/*" className="hidden" onChange={handleProfileImageUpload} />
      <input id="resumeInput" type="file" accept="application/pdf" className="hidden" onChange={handleResumeUpload} />

      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-glow rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-swipe-text-primary mb-2">
            Create Your Professional Profile
          </h1>
          <p className="text-swipe-text-secondary text-lg">
            Showcase your skills and experience to potential employers
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-gradient-card border-swipe-border shadow-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-swipe-blue" />
              <h2 className="text-2xl font-bold text-swipe-text-primary">Basic Information</h2>
            </div>
            
            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-primary border-4 border-swipe-border shadow-glow flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-12 h-12 text-swipe-text-primary" />
                    )}
                  </div>
                  <Button
                    variant="swipe"
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full"
                    onClick={() => document.getElementById('profileImageInput') && document.getElementById('profileImageInput').click()}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-swipe-text-secondary text-sm">Upload your professional photo</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-swipe-text-primary font-medium">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-swipe-text-primary font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-swipe-blue" />
                    Location
                  </label>
                  <Input
                    placeholder="San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-swipe-text-primary font-medium">Professional Tagline</label>
                <Input
                  placeholder="Frontend Developer | React Specialist | MERN Stack"
                  value={formData.tagline}
                  onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                />
              </div>
            </div>
          </Card>

          {/* Professional Details */}
          <Card className="bg-gradient-card border-swipe-border shadow-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-swipe-blue" />
              <h2 className="text-2xl font-bold text-swipe-text-primary">Professional Details</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-swipe-text-primary font-medium">Current Role / Job Title</label>
                  <Input
                    placeholder="Software Engineer"
                    value={formData.currentRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-swipe-text-primary font-medium">Employment Type</label>
                  <Select value={formData.employmentType} onValueChange={(value) => setFormData(prev => ({ ...prev, employmentType: value }))}>
                    <SelectTrigger className="bg-swipe-dark border-swipe-border text-swipe-text-primary h-12">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent className="bg-swipe-dark border-swipe-border z-50">
                      <SelectItem value="internship" className="text-swipe-text-primary hover:bg-swipe-blue/20">Internship</SelectItem>
                      <SelectItem value="part-time" className="text-swipe-text-primary hover:bg-swipe-blue/20">Part-time</SelectItem>
                      <SelectItem value="full-time" className="text-swipe-text-primary hover:bg-swipe-blue/20">Full-time</SelectItem>
                      <SelectItem value="freelance" className="text-swipe-text-primary hover:bg-swipe-blue/20">Freelance</SelectItem>
                      <SelectItem value="open-to-all" className="text-swipe-text-primary hover:bg-swipe-blue/20">Open to all</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-swipe-text-primary font-medium">Experience Level</label>
                <Select value={formData.experienceLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}>
                  <SelectTrigger className="bg-swipe-dark border-swipe-border text-swipe-text-primary h-12">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-swipe-dark border-swipe-border z-50">
                    <SelectItem value="fresher" className="text-swipe-text-primary hover:bg-swipe-blue/20">Fresher</SelectItem>
                    <SelectItem value="0-1" className="text-swipe-text-primary hover:bg-swipe-blue/20">0-1 years</SelectItem>
                    <SelectItem value="1-3" className="text-swipe-text-primary hover:bg-swipe-blue/20">1-3 years</SelectItem>
                    <SelectItem value="3-5" className="text-swipe-text-primary hover:bg-swipe-blue/20">3-5 years</SelectItem>
                    <SelectItem value="5+" className="text-swipe-text-primary hover:bg-swipe-blue/20">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="text-swipe-text-primary font-medium">Skills</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
                  {availableSkills.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <div
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`
                          cursor-pointer p-3 rounded-lg border transition-all duration-300 text-center
                          ${isSelected 
                            ? 'bg-gradient-primary border-swipe-blue shadow-glow' 
                            : 'bg-swipe-dark border-swipe-border hover:border-swipe-blue/50'
                          }
                        `}
                      >
                        <span className={`text-sm font-medium ${isSelected ? 'text-swipe-text-primary' : 'text-swipe-text-secondary'}`}>
                          {skill}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <Badge 
                      key={skill} 
                      className="bg-swipe-blue text-swipe-text-primary hover:bg-swipe-blue/80 cursor-pointer"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Work Experience */}
          <Card className="bg-gradient-card border-swipe-border shadow-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-swipe-blue" />
                <h2 className="text-2xl font-bold text-swipe-text-primary">Work Experience</h2>
              </div>
              <Button variant="swipe-outline" onClick={addWorkExperience}>
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>
            
            <div className="space-y-6">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="relative bg-swipe-dark/50 rounded-lg p-6 border border-swipe-border">
                  <Button
                    variant="swipe-ghost"
                    size="icon"
                    className="absolute top-4 right-4"
                    onClick={() => removeWorkExperience(exp.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      placeholder="Job Title"
                      value={exp.jobTitle}
                      onChange={(e) => updateWorkExperience(exp.id, 'jobTitle', e.target.value)}
                    />
                    <Input
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-swipe-text-primary font-medium text-sm">Start Date</label>
                      <DatePicker
                        date={exp.startDate}
                        onDateChange={(date) => updateWorkExperience(exp.id, 'startDate', date || null)}
                        placeholder="Start Date"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-swipe-text-primary font-medium text-sm">End Date</label>
                      <DatePicker
                        date={exp.endDate}
                        onDateChange={(date) => updateWorkExperience(exp.id, 'endDate', date || null)}
                        placeholder="End Date"
                      />
                    </div>
                  </div>
                  
                  <Textarea
                    placeholder="Describe your work and achievements..."
                    className="min-h-[100px] bg-swipe-dark border-swipe-border text-swipe-text-primary placeholder:text-swipe-text-secondary resize-none"
                    value={exp.description}
                    onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
                  />
                </div>
              ))}
              
              {workExperiences.length === 0 && (
                <div className="text-center py-8 text-swipe-text-secondary">
                  No work experience added yet. Click "Add Experience" to get started.
                </div>
              )}
            </div>
          </Card>

          {/* Education */}
          <Card className="bg-gradient-card border-swipe-border shadow-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-swipe-blue" />
                <h2 className="text-2xl font-bold text-swipe-text-primary">Education</h2>
              </div>
              <Button variant="swipe-outline" onClick={addEducation}>
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </div>
            
            <div className="space-y-6">
              {educations.map((edu) => (
                <div key={edu.id} className="relative bg-swipe-dark/50 rounded-lg p-6 border border-swipe-border">
                  <Button
                    variant="swipe-ghost"
                    size="icon"
                    className="absolute top-4 right-4"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Degree / Course"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    />
                    <Input
                      placeholder="Institution Name"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    />
                    <Input
                      placeholder="Year (e.g., 2023)"
                      value={edu.yearCompleted}
                      onChange={(e) => updateEducation(edu.id, 'yearCompleted', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              
              {educations.length === 0 && (
                <div className="text-center py-8 text-swipe-text-secondary">
                  No education added yet. Click "Add Education" to get started.
                </div>
              )}
            </div>
          </Card>

          {/* Portfolio & Links */}
          <Card className="bg-gradient-card border-swipe-border shadow-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Link2 className="w-6 h-6 text-swipe-blue" />
              <h2 className="text-2xl font-bold text-swipe-text-primary">Portfolio & Links</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-swipe-text-primary font-medium">Portfolio / GitHub URL</label>
                  <Input
                    placeholder="https://github.com/johndoe"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-swipe-text-primary font-medium">LinkedIn Profile</label>
                  <Input
                    placeholder="https://linkedin.com/in/johndoe"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-swipe-text-primary font-medium">Resume Upload</label>
                <div className="border-2 border-dashed border-swipe-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-swipe-blue mx-auto mb-4" />
                  <p className="text-swipe-text-primary mb-2">Upload your resume (PDF)</p>
                  <p className="text-swipe-text-secondary text-sm mb-4">Max file size: 5MB</p>
                  <Button variant="swipe-outline" onClick={() => document.getElementById('resumeInput') && document.getElementById('resumeInput').click()}>
                    Choose File
                  </Button>
                  {resume && (
                    <p className="text-swipe-blue mt-2">{resume.name}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="bg-gradient-card border-swipe-border shadow-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-swipe-blue" />
              <h2 className="text-2xl font-bold text-swipe-text-primary">Job Preferences</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-swipe-text-primary font-medium">Looking For</label>
                  <Select value={formData.lookingFor} onValueChange={(value) => setFormData(prev => ({ ...prev, lookingFor: value }))}>
                    <SelectTrigger className="bg-swipe-dark border-swipe-border text-swipe-text-primary h-12">
                      <SelectValue placeholder="What are you looking for?" />
                    </SelectTrigger>
                    <SelectContent className="bg-swipe-dark border-swipe-border z-50">
                      <SelectItem value="internship" className="text-swipe-text-primary hover:bg-swipe-blue/20">Internship</SelectItem>
                      <SelectItem value="job" className="text-swipe-text-primary hover:bg-swipe-blue/20">Job</SelectItem>
                      <SelectItem value="freelance" className="text-swipe-text-primary hover:bg-swipe-blue/20">Freelance Projects</SelectItem>
                      <SelectItem value="networking" className="text-swipe-text-primary hover:bg-swipe-blue/20">Networking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-swipe-text-primary font-medium">Preferred Industry</label>
                  <Input
                    placeholder="Technology, Healthcare, Finance..."
                    value={formData.preferredIndustry}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredIndustry: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button variant="swipe-outline" className="flex-1" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button variant="swipe" size="lg" className="flex-1" onClick={handleCreateProfile}>
              Create Profile
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-swipe-text-secondary text-sm">
            Need help?{" "}
            <button className="text-swipe-blue hover:underline font-medium transition-colors">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default JobseekerProfileCreation;
