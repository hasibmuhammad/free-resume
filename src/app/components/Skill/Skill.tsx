"use client";
import {
  addSkill,
  removeSkill,
  undoRemoveSkill,
} from "@/redux/features/skillSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from "../Icons/Close";

const Skill = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state: RootState) => state.skill);
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
    <section className="border p-4 rounded-lg">
      <div className="my-5 space-y-4">
        <div className="w-full flex flex-col gap-1">
          <label>Add Skill</label>
          <div className="flex flex-wrap items-center gap-1 border rounded-lg px-3 py-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-black text-white px-3 py-1 rounded-full"
              >
                <span>{skill}</span>
                <button
                  onClick={() => dispatch(removeSkill(index))}
                  className="ml-2 text-white"
                >
                  <Close />
                </button>
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type and press Enter..."
              className="outline-none flex-1"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skill;
