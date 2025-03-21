"use client";
import { moveSection, toggleVisibility } from "@/redux/features/sectionsSlice";
import { RootState } from "@/redux/store";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicInfo from "../BasicInfo/BasicInfo";
import Education from "../Education/Education";
import Experience from "../Experience/Experience";
import ArrowDown from "../Icons/ArrowDown";
import ArrowUp from "../Icons/ArrowUp";
import EyeClose from "../Icons/EyeClose";
import EyeOpen from "../Icons/EyeOpen";
import Project from "../Project/Project";
import Skill from "../Skill/Skill";

const componentsMap: { [key: string]: React.ComponentType } = {
  experience: Experience,
  project: Project,
  education: Education,
  skill: Skill,
};

const Form = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state: RootState) => state.sections.sections);
  const sectionVisibility = useSelector(
    (state: RootState) => state.sections.visibility
  );

  return (
    <div className="mx-5 my-2 shadow-2xl bg-white px-6 rounded-lg border space-y-4">
      <>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Basic Info</h1>
        </div>
        <hr />
        <BasicInfo />
      </>

      {sections.map(({ key, title }, index) => {
        const Component = componentsMap[key];
        return (
          <Fragment key={key}>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold">{title}</h1>
              <div className="flex items-center gap-2">
                {index > 0 && (
                  <button
                    onClick={() =>
                      dispatch(moveSection({ index, direction: "up" }))
                    }
                  >
                    <ArrowUp />
                  </button>
                )}
                {index < sections.length - 1 && (
                  <button
                    onClick={() =>
                      dispatch(moveSection({ index, direction: "down" }))
                    }
                  >
                    <ArrowDown />
                  </button>
                )}
                <button onClick={() => dispatch(toggleVisibility(key))}>
                  {sectionVisibility[key] ? <EyeOpen /> : <EyeClose />}
                </button>
              </div>
            </div>
            <hr />
            {Component && sectionVisibility[key] && <Component />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Form;
