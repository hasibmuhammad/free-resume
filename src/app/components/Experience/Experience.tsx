/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ArrowDown from "../Icons/ArrowDown";
import Close from "../Icons/Close";
import ArrowUp from "../Icons/ArrowUp";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import {
  addExperience,
  moveExperience,
  removeExperience,
  updateExperience,
} from "@/redux/features/experienceSlice";

interface ExperienceItem {
  companyName: string;
  jobTitle: string;
  location: string;
  currentlyWorking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  present: string;
  accomplishments: string;
}

const Experience = () => {
  const experiences = useAppSelector((state) => state.experience.experiences);
  const dispatch = useAppDispatch();

  const handleChange = (
    index: number,
    field: keyof ExperienceItem,
    value: any
  ) => {
    dispatch(updateExperience({ index, field, value }));
  };

  const handleAccomplishmentChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const lines = e.target.value.split("\n").map((line) => {
      if (line.trim() === "") return ""; // Empty lines should remain empty (allow Enter key to work)
      return line.startsWith("•") ? line : `• ${line.replace(/^•\s*/, "")}`;
    });

    handleChange(index, "accomplishments", lines.join("\n"));
  };

  const handleAddExperience = () => {
    dispatch(addExperience());
  };

  const handleRemoveExperience = (index: number) => {
    dispatch(removeExperience(index));
  };

  const handleMoveExperience = (index: number, direction: "up" | "down") => {
    dispatch(moveExperience({ index, direction }));
  };

  return (
    <section className="border p-4 rounded-lg">
      <form className="my-5 space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="border p-4 rounded-lg space-y-4 relative">
            <div className="flex items-center justify-end gap-2">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleMoveExperience(index, "up")}
                >
                  <ArrowUp />
                </button>
              )}
              {index < experiences.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleMoveExperience(index, "down")}
                >
                  <ArrowDown />
                </button>
              )}
              {experiences.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(index)}
                >
                  <Close />
                </button>
              )}
            </div>
            {/* Render your form fields here */}
            <div className="w-full flex flex-col gap-1">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="Enter job title"
                className="outline-none border rounded-lg px-3 py-2"
                value={exp.jobTitle}
                onChange={(e) =>
                  handleChange(index, "jobTitle", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full flex flex-col gap-1">
                <label>Company Name</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  className="outline-none border rounded-lg px-3 py-2"
                  value={exp.companyName}
                  onChange={(e) =>
                    handleChange(index, "companyName", e.target.value)
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="outline-none border rounded-lg px-3 py-2"
                  value={exp.location}
                  onChange={(e) =>
                    handleChange(index, "location", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label>
                  <span className="flex items-center gap-1">
                    <input
                      onChange={() =>
                        handleChange(
                          index,
                          "currentlyWorking",
                          !exp.currentlyWorking
                        )
                      }
                      checked={exp.currentlyWorking}
                      className="w-4 h-4"
                      type="checkbox"
                    />
                    Currently Working
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <div className="relative w-full flex flex-col gap-1">
                  <label>Start Date</label>
                  <Datepicker
                    value={exp.startDate}
                    onChange={(value) =>
                      handleChange(index, "startDate", value)
                    }
                    inputClassName="w-full border bg-white p-2 rounded-lg outline-none"
                    popoverDirection="up"
                    useRange={false}
                    asSingle={true}
                    displayFormat="MM/DD/YYYY"
                  />
                </div>
              </div>

              <div className="w-full">
                {exp.currentlyWorking ? (
                  <div className="relative w-full flex flex-col gap-1">
                    <label>End Date</label>
                    <input
                      value={exp.present}
                      disabled={true}
                      className="text-gray-400 outline-none border rounded-lg px-3 py-2 cursor-not-allowed"
                      type="text"
                      readOnly
                    />
                  </div>
                ) : (
                  <div className="relative w-full flex flex-col gap-1">
                    <label>End Date</label>
                    <Datepicker
                      value={exp.endDate}
                      onChange={(value) =>
                        handleChange(index, "endDate", value)
                      }
                      inputClassName="w-full border bg-white p-2 rounded-lg outline-none"
                      popoverDirection="up"
                      useRange={false}
                      asSingle={true}
                      displayFormat="MM/DD/YYYY"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="w-full">
              <div className="w-full flex flex-col gap-1">
                <label>Accomplishment</label>
                <textarea
                  placeholder="Enter accomplishments (one per line)"
                  className="outline-none border rounded-lg px-3 py-2 resize-none 
                    [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 
                    [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full"
                  rows={5}
                  value={exp.accomplishments}
                  onChange={(e) => handleAccomplishmentChange(index, e)}
                ></textarea>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={handleAddExperience}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            + Add More
          </button>
        </div>
      </form>
    </section>
  );
};

export default Experience;
