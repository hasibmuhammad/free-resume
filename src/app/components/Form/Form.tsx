"use client";
import React, { useState } from "react";
import BasicInfo from "../BasicInfo/BasicInfo";
import Experience from "../Experience/Experience";
import Project from "../Project/Project";
import Education from "../Education/Education";
import Skill from "../Skill/Skill";
import ArrowDown from "../Icons/ArrowDown";
import EyeOpen from "../Icons/EyeOpen";
import EyeClose from "../Icons/EyeClose";

const Form = () => {
  const [sectionVisibility, setSectionVisibility] = useState<{
    [key: string]: boolean;
  }>({
    basicSection: true,
    experience: true,
    project: true,
    education: true,
    skill: true,
  });

  const handleToggleShowHideSection = (key: string) => {
    setSectionVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mx-5 my-5 shadow-2xl bg-white px-6 py-4 rounded-lg border space-y-4">
      <>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Basic Info</h1>
          <div>
            <button onClick={() => handleToggleShowHideSection("basicSection")}>
              {sectionVisibility["basicSection"] ? <EyeOpen /> : <EyeClose />}
            </button>
          </div>
        </div>
        <hr />
        <BasicInfo />
      </>
      <>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Experience</h1>
          <div className="flex items-center gap-2">
            <button>
              <ArrowDown />
            </button>
            <button onClick={() => handleToggleShowHideSection("experience")}>
              {sectionVisibility["experience"] ? <EyeOpen /> : <EyeClose />}
            </button>
          </div>
        </div>
        <hr />

        <Experience />
      </>

      <>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Projects</h1>
          <div className="flex items-center gap-2">
            <button>
              <ArrowDown />
            </button>
            <button onClick={() => handleToggleShowHideSection("project")}>
              {sectionVisibility["project"] ? <EyeOpen /> : <EyeClose />}
            </button>
          </div>
        </div>
        <hr />
        <Project />
      </>
      <>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Education</h1>
          <div className="flex items-center gap-2">
            <button>
              <ArrowDown />
            </button>
            <button onClick={() => handleToggleShowHideSection("project")}>
              {sectionVisibility["project"] ? <EyeOpen /> : <EyeClose />}
            </button>
          </div>
        </div>
        <hr />
        <Education />
      </>
      <>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Skill</h1>
          <div className="flex items-center gap-2">
            <button>
              <ArrowDown />
            </button>
            <button onClick={() => handleToggleShowHideSection("project")}>
              {sectionVisibility["project"] ? <EyeOpen /> : <EyeClose />}
            </button>
          </div>
        </div>
        <hr />
        <Skill />
      </>
    </div>
  );
};

export default Form;
