import React from "react";
import { MapPin, Briefcase, GraduationCap, Link as LinkIcon } from "lucide-react";


const SwipeCard = ({ profile }) => {
  // ✅ Defaults if fields are empty
  const safeProfile = {
    fullName: profile?.fullName || "John Doe",
    tagline: profile?.tagline || "Aspiring Developer | Open to opportunities",
    profileImage: profile?.profileImage || "/default-avatar.png",
    employmentType: profile?.employmentType || "N/A",
    experienceLevel: profile?.experienceLevel || "Beginner",
    currentRole: profile?.currentRole || "Student",
    preferredIndustry: profile?.preferredIndustry || "Technology",
    location: profile?.location || "Remote / Anywhere",
    lookingFor: profile?.lookingFor || "Internship",
    jobType: profile?.jobType || "Full-time",
    skills: profile?.skills?.length ? profile.skills : ["JavaScript", "React", "Node.js"],
    education: profile?.education || [],
    portfolioLinks: profile?.portfolioLinks || [],
  };

  return (
    <div className="w-[300px] h-[470px] bg-slate-800 rounded-2xl p-6 shadow-2xl shadow-black/30 flex flex-col justify-between">
      
      

      {/* Profile image */}
      <div className="flex justify-center mt-3">
        <img
          src={safeProfile.profileImage}
          alt={safeProfile.fullName}
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-md"
        />
      </div>

      {/* Header */}
      <div className="justify-center text-center mt-4">
        <h2 className="text-xl font-semibold text-white">{safeProfile.fullName}</h2>
        <p className="text-sm text-gray-300">{safeProfile.tagline}</p>
      </div>

      {/* Job details */}
      <div className="grid grid-cols-2 gap-3 mt-4 text-white text-sm">
        <div className="flex items-center gap-1">
          <Briefcase size={14} /> {safeProfile.currentRole}
        </div>
        <div>{safeProfile.preferredIndustry}</div>
        <div className="flex items-center gap-1">
          <MapPin size={14} /> {safeProfile.location}
        </div>
        <div>
          {safeProfile.employmentType} • {safeProfile.experienceLevel}
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-white">Skills</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {safeProfile.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-slate-900 text-white text-xs rounded-md border border-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      {safeProfile.education.length > 0 && (
        <div className="mt-3">
          <h3 className="text-sm font-medium text-white">Education</h3>
          {safeProfile.education.map((edu, i) => (
            <p key={i} className="text-xs text-gray-300 flex items-center gap-1">
              <GraduationCap size={14} /> {edu.degree} at {edu.institution} ({edu.year})
            </p>
          ))}
        </div>
      )}

      {/* Portfolio */}
      {safeProfile.portfolioLinks.length > 0 && (
        <div className="mt-3">
          <h3 className="text-sm font-medium text-white">Portfolio</h3>
          {safeProfile.portfolioLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 flex items-center gap-1 underline"
            >
              <LinkIcon size={12} /> {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-4 border-t border-slate-700 pt-4">
        <button className="flex-1 py-2 rounded-full bg-slate-900 text-blue-500 font-semibold text-sm hover:bg-slate-700 transition">
          Skip
        </button>
        <button className="flex-1 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition">
          Match
        </button>
      </div>
    </div>
  );
};

export default SwipeCard;
