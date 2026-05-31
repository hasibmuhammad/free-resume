"use client";

import { moveSection, toggleVisibility } from "@/redux/features/sectionsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SectionKey } from "@/types/resume";
import React from "react";
import BasicInfo from "../BasicInfo/BasicInfo";
import Education from "../Education/Education";
import Experience from "../Experience/Experience";
import Project from "../Project/Project";
import Skill from "../Skill/Skill";
import { FormBlock } from "../ui/FormSection";
import { FormSectionHeader } from "../ui/FormSectionHeader";

const componentsMap: Record<SectionKey, React.ComponentType> = {
  experience: Experience,
  project: Project,
  education: Education,
  skill: Skill,
};

const sectionDescriptions: Partial<Record<SectionKey, string>> = {
  experience: "Work history and roles",
  project: "Personal or professional projects",
  education: "Degrees and schools",
  skill: "Technologies and tools",
};

const Form = () => {
  const dispatch = useAppDispatch();
  const sections = useAppSelector((state) => state.sections.sections);
  const sectionVisibility = useAppSelector(
    (state) => state.sections.visibility
  );

  const canMove = (index: number, direction: "up" | "down") => {
    const current = sections[index];
    if (!current) return false;

    const column = current.column;
    if (direction === "up") {
      for (let i = index - 1; i >= 0; i--) {
        if (sections[i]?.column === column) return true;
      }
      return false;
    }

    for (let i = index + 1; i < sections.length; i++) {
      if (sections[i]?.column === column) return true;
    }
    return false;
  };

  return (
    <div className="space-y-8">
      <FormBlock>
        <FormSectionHeader
          title="Basic Info"
          description="Name, contact, and summary"
        />
        <BasicInfo />
      </FormBlock>

      {sections.map(({ key, title }, index) => {
        const Component = componentsMap[key];
        const isVisible = sectionVisibility[key];

        return (
          <FormBlock key={key}>
            <FormSectionHeader
              title={title}
              description={sectionDescriptions[key]}
              showMoveUp={canMove(index, "up")}
              showMoveDown={canMove(index, "down")}
              isVisible={isVisible}
              onMoveUp={() =>
                dispatch(moveSection({ index, direction: "up" }))
              }
              onMoveDown={() =>
                dispatch(moveSection({ index, direction: "down" }))
              }
              onToggleVisibility={() => dispatch(toggleVisibility(key))}
            />
            {isVisible && Component && <Component />}
          </FormBlock>
        );
      })}
    </div>
  );
};

export default Form;
