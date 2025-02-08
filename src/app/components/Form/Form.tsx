"use client";
import React from "react";
import BasicInfo from "../BasicInfo/BasicInfo";
import Experience from "../Experience/Experience";
import Project from "../Project/Project";
import Education from "../Education/Education";
import Skill from "../Skill/Skill";

const Form = () => {
  return (
    <div className="mx-5 my-5 shadow-2xl bg-white px-6 py-4 rounded-lg border space-y-4">
      <BasicInfo />
      <Experience />
      <Project />
      <Education />
      <Skill />
    </div>
  );
};

export default Form;
