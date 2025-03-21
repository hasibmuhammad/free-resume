"use client";
import { RootState } from "@/redux/store";
import moment from "moment";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { DateValueType } from "react-tailwindcss-datepicker";

const Preview = () => {
  const basicInfo = useSelector((state: RootState) => state.basicInfo);
  const experiences = useSelector(
    (state: RootState) => state.experience.experiences
  );
  const projects = useSelector((state: RootState) => state.project.projects);
  const education = useSelector(
    (state: RootState) => state.education.educations
  );
  const { skills } = useSelector((state: RootState) => state.skill);
  const sectionVisibility = useSelector(
    (state: RootState) => state.sections.visibility
  );

  const formatDate = (date: DateValueType) => {
    return date?.startDate ? moment(date.startDate).format("MMM YYYY") : "";
  };

  console.log(projects);
  console.log(education);

  return (
    <div className="bg-white px-8 py-4 shadow-2xl w-full h-screen mb-2 rounded-lg border overflow-y-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold uppercase">{basicInfo.fullName}</h1>
        <p className="text-lg text-gray-600 mt-1">{basicInfo.designation}</p>
        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
          {basicInfo.email && (
            <div className="flex items-center gap-1">
              <FaEnvelope className="text-gray-500" />
              <span>{basicInfo.email}</span>
            </div>
          )}
          {basicInfo.phone && (
            <div className="flex items-center gap-1">
              <FaPhone className="text-gray-500" />
              <span>{basicInfo.phone}</span>
            </div>
          )}
          {basicInfo.location && (
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-500" />
              <span>{basicInfo.location}</span>
            </div>
          )}
          {basicInfo.github && (
            <a
              href={basicInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-black transition-colors"
            >
              <FaGithub className="text-lg" />
              <span>{basicInfo.github}</span>
            </a>
          )}
          {basicInfo.linkedin && (
            <a
              href={basicInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin className="text-lg" />
              <span>{basicInfo.linkedin}</span>
            </a>
          )}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content - Left Column */}
        <div className="col-span-8">
          {/* Summary */}
          {basicInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold border-b border-gray-300 mb-3">
                SUMMARY
              </h2>
              <p className="text-sm leading-relaxed">{basicInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {sectionVisibility.experience &&
            experiences.some((ex) => ex.companyName.trim() !== "") && (
              <section className="mb-6">
                <h2 className="text-lg font-bold border-b border-gray-300 mb-3">
                  EXPERIENCE
                </h2>
                {experiences.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{exp.jobTitle}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {exp.companyName} • {exp.location}
                    </p>
                    <p className="text-sm mt-2 whitespace-pre-line">
                      {exp.accomplishments}
                    </p>
                  </div>
                ))}
              </section>
            )}

          {/* Projects */}
          {sectionVisibility.project &&
            projects.some((pro) => pro.projectTitle.trim() !== "") && (
              <section className="mb-6">
                <h2 className="text-lg font-bold border-b border-gray-300 mb-3">
                  PROJECTS
                </h2>
                {projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold">{project.projectTitle}</h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(project.startDate)} -{" "}
                      {project.currentlyWorking
                        ? "Present"
                        : formatDate(project.endDate)}
                    </p>
                    <p className="text-sm mt-2 whitespace-pre-line">
                      {project.keyFeatures}
                    </p>
                  </div>
                ))}
              </section>
            )}
        </div>

        {/* Sidebar - Right Column */}
        <div className="col-span-4">
          {/* Skills */}
          {sectionVisibility.skill && skills?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold border-b border-gray-300 mb-3">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {sectionVisibility.education &&
            education.some((edu) => edu.degree.trim() !== "") && (
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 mb-3">
                  EDUCATION
                </h2>
                {education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm">{edu.institute}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.currentlyTaking
                        ? "Present"
                        : formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </section>
            )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
