import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import IconDelete from "../Icons/IconDelete";
import EyeOpen from "../Icons/EyeOpen";
import ArrowDown from "../Icons/ArrowDown";
import EyeClose from "../Icons/EyeClose";
import ArrowUp from "../Icons/ArrowUp";

interface ExperienceItem {
  companyName: string;
  jobTitle: string;
  location: string;
  currentlyWorking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  accomplishments: string;
}

const Experience = () => {
  const [show, setShow] = useState(true);

  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      companyName: "",
      jobTitle: "",
      location: "",
      currentlyWorking: false,
      startDate: { startDate: null, endDate: null },
      endDate: { startDate: null, endDate: null },
      accomplishments: "",
    },
  ]);

  const handleChange = <K extends keyof ExperienceItem>(
    index: number,
    field: K,
    value: ExperienceItem[K]
  ) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperiences(updatedExperiences);
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

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        companyName: "",
        jobTitle: "",
        location: "",
        currentlyWorking: false,
        startDate: { startDate: null, endDate: null },
        endDate: { startDate: null, endDate: null },
        accomplishments: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleToggleExperience = () => {
    setShow(!show);
  };

  const moveExperience = (index: number, direction: "up" | "down") => {
    const newExperiences = [...experiences];
    const [removed] = newExperiences.splice(index, 1);
    if (direction === "up" && index > 0) {
      newExperiences.splice(index - 1, 0, removed);
    } else if (direction === "down" && index < experiences.length - 1) {
      newExperiences.splice(index + 1, 0, removed);
    }
    setExperiences(newExperiences);
  };

  return (
    <section className="border p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Experience</h1>
        <div className="flex items-center gap-2">
          <button>
            <ArrowDown />
          </button>
          <button onClick={handleToggleExperience}>
            {show ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>
      </div>
      <hr />

      <form className="my-5 space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="border p-4 rounded-lg space-y-4 relative">
            <div className="flex items-center justify-end gap-2">
              {/* Arrow Up */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => moveExperience(index, "up")}
                  className=""
                >
                  <ArrowUp />
                </button>
              )}

              {/* Arrow Down */}
              {index < experiences.length - 1 && (
                <button
                  type="button"
                  onClick={() => moveExperience(index, "down")}
                  className=""
                >
                  <ArrowDown />
                </button>
              )}

              {/* Delete button */}
              {experiences.length !== 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className=""
                >
                  <IconDelete />
                </button>
              )}
            </div>
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
                      value="Present"
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
            onClick={addExperience}
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
