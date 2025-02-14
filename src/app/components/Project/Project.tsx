import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import IconDelete from "../Icons/IconDelete";
import ArrowDown from "../Icons/ArrowDown";
import ArrowUp from "../Icons/ArrowUp";

interface ProjectItem {
  projectTitle: string;
  currentlyWorking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  keyFeatures: string;
}

const Project = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      projectTitle: "",
      currentlyWorking: false,
      startDate: { startDate: null, endDate: null },
      endDate: { startDate: null, endDate: null },
      keyFeatures: "",
    },
  ]);

  const handleChange = <K extends keyof ProjectItem>(
    index: number,
    field: K,
    value: ProjectItem[K]
  ) => {
    const updatedprojects = projects.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setProjects(updatedprojects);
  };

  const handleAccomplishmentChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const lines = e.target.value.split("\n").map((line) => {
      if (line.trim() === "") return ""; // Empty lines should remain empty (allow Enter key to work)
      return line.startsWith("•") ? line : `• ${line.replace(/^•\s*/, "")}`;
    });

    handleChange(index, "keyFeatures", lines.join("\n"));
  };

  const addItem = () => {
    setProjects([
      ...projects,
      {
        projectTitle: "",
        currentlyWorking: false,
        startDate: { startDate: null, endDate: null },
        endDate: { startDate: null, endDate: null },
        keyFeatures: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newprojects = [...projects];
    const [removed] = newprojects.splice(index, 1);
    if (direction === "up" && index > 0) {
      newprojects.splice(index - 1, 0, removed);
    } else if (direction === "down" && index < projects.length - 1) {
      newprojects.splice(index + 1, 0, removed);
    }
    setProjects(newprojects);
  };

  return (
    <section className="border p-4 rounded-lg">
      <form className="my-5 space-y-4">
        {projects.map((exp, index) => (
          <div key={index} className="border p-4 rounded-lg space-y-4 relative">
            <div className="flex items-center justify-end gap-2">
              {/* Arrow Up */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => moveItem(index, "up")}
                  className=""
                >
                  <ArrowUp />
                </button>
              )}

              {/* Arrow Down */}
              {index < projects.length - 1 && (
                <button
                  type="button"
                  onClick={() => moveItem(index, "down")}
                  className=""
                >
                  <ArrowDown />
                </button>
              )}

              {/* Delete button */}
              {projects.length !== 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className=""
                >
                  <IconDelete />
                </button>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <label>Project Title</label>
              <input
                type="text"
                placeholder="Enter project title"
                className="outline-none border rounded-lg px-3 py-2"
                value={exp.projectTitle}
                onChange={(e) =>
                  handleChange(index, "projectTitle", e.target.value)
                }
              />
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
                <label>Key Features</label>
                <textarea
                  placeholder="Enter features (one per line)"
                  className="outline-none border rounded-lg px-3 py-2 resize-none 
                    [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 
                    [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full"
                  rows={5}
                  value={exp.keyFeatures}
                  onChange={(e) => handleAccomplishmentChange(index, e)}
                ></textarea>
              </div>
            </div>
          </div>
        ))}

        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            + Add More
          </button>
        </div>
      </form>
    </section>
  );
};

export default Project;
