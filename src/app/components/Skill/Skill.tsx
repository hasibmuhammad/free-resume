"use client";

import {
  addSkill,
  removeSkill,
  undoRemoveSkill,
} from "@/redux/features/skillSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { inputClassName, skillTagClassName } from "@/lib/formStyles";
import { useEffect, useState } from "react";
import Close from "../Icons/Close";
import { FormField } from "../ui/FormField";
import { FormSection } from "../ui/FormSection";

const Skill = () => {
  const dispatch = useAppDispatch();
  const { skills } = useAppSelector((state) => state.skill);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      dispatch(addSkill(inputValue.trim()));
      setInputValue("");
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      skills.length > 0
    ) {
      dispatch(removeSkill(skills.length - 1));
    }
  };

  useEffect(() => {
    const handleUndo = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        dispatch(undoRemoveSkill());
      }
    };

    window.addEventListener("keydown", handleUndo);
    return () => window.removeEventListener("keydown", handleUndo);
  }, [dispatch]);

  return (
    <FormSection>
      <FormField label="Add skills" hint="Press Enter to add each skill">
        <div
          className={`${inputClassName} flex flex-wrap items-center gap-1.5 min-h-[36px]`}
        >
          {skills.map((skill, index) => (
            <span key={index} className={skillTagClassName}>
              {skill}
              <button
                type="button"
                onClick={() => dispatch(removeSkill(index))}
                className="text-brand-400 hover:text-brand-700"
                aria-label={`Remove ${skill}`}
              >
                <Close />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              skills.length === 0 ? "React, TypeScript, Figma..." : "Add more"
            }
            className="outline-none flex-1 min-w-[100px] bg-transparent text-sm"
            onKeyDown={handleKeyDown}
          />
        </div>
      </FormField>
    </FormSection>
  );
};

export default Skill;
