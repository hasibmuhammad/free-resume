import {
  addProject,
  moveProject,
  removeProject,
  updateProject,
} from "@/redux/features/projectSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import ArrowDown from "../Icons/ArrowDown";
import ArrowUp from "../Icons/ArrowUp";
import IconDelete from "../Icons/IconDelete";

interface ProjectItem {
  projectTitle: string;
  currentlyWorking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  keyFeatures: string;
}

const Project = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project.projects);

  const handleChange = (
    index: number,
    field: keyof ProjectItem,
    value: string | boolean | DateValueType
  ) => {
    dispatch(updateProject({ index, field, value }));
  };

  const handleAccomplishmentChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const lines = e.target.value.split("\n").map((line) => {
      if (line.trim() === "") return "";
      return line.startsWith("•") ? line : `• ${line.replace(/^•\s*/, "")}`;
    });

    handleChange(index, "keyFeatures", lines.join("\n"));
  };

  // Rest of your component remains the same, but update these functions:
  const addItem = () => {
    dispatch(addProject());
  };

  const removeItem = (index: number) => {
    if (projects.length > 1) {
      dispatch(removeProject(index));
    }
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    dispatch(moveProject({ index, direction }));
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
