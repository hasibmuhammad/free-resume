import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import IconDelete from "../Icons/IconDelete";
import EyeOpen from "../Icons/EyeOpen";
import ArrowDown from "../Icons/ArrowDown";
import EyeClose from "../Icons/EyeClose";
import ArrowUp from "../Icons/ArrowUp";

interface ProjectItem {
  degree: string;
  currentlyTaking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  institute: string;
}

const Education = () => {
  const [show, setShow] = useState(true);

  const [educations, setEducations] = useState<ProjectItem[]>([
    {
      degree: "",
      currentlyTaking: false,
      startDate: { startDate: null, endDate: null },
      endDate: { startDate: null, endDate: null },
      institute: "",
    },
  ]);

  const handleChange = <K extends keyof ProjectItem>(
    index: number,
    field: K,
    value: ProjectItem[K]
  ) => {
    const updatededucations = educations.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setEducations(updatededucations);
  };

  const addItem = () => {
    setEducations([
      ...educations,
      {
        degree: "",
        currentlyTaking: false,
        startDate: { startDate: null, endDate: null },
        endDate: { startDate: null, endDate: null },
        institute: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const handleToggle = () => {
    setShow(!show);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const neweducations = [...educations];
    const [removed] = neweducations.splice(index, 1);
    if (direction === "up" && index > 0) {
      neweducations.splice(index - 1, 0, removed);
    } else if (direction === "down" && index < educations.length - 1) {
      neweducations.splice(index + 1, 0, removed);
    }
    setEducations(neweducations);
  };

  return (
    <section className="border p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Education</h1>
        <div className="flex items-center gap-2">
          <button>
            <ArrowDown />
          </button>
          <button onClick={handleToggle}>
            {show ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>
      </div>
      <hr />

      <form className="my-5 space-y-4">
        {educations.map((edu, index) => (
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
              {index < educations.length - 1 && (
                <button
                  type="button"
                  onClick={() => moveItem(index, "down")}
                  className=""
                >
                  <ArrowDown />
                </button>
              )}

              {/* Delete button */}
              {educations.length !== 1 && (
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
              <label>Degree or Field of Study</label>
              <input
                type="text"
                placeholder="Enter degree or field of study"
                className="outline-none border rounded-lg px-3 py-2"
                value={edu.degree}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
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
                          "currentlyTaking",
                          !edu.currentlyTaking
                        )
                      }
                      checked={edu.currentlyTaking}
                      className="w-4 h-4"
                      type="checkbox"
                    />
                    Currently Taking
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <div className="relative w-full flex flex-col gap-1">
                  <label>Start Date</label>
                  <Datepicker
                    value={edu.startDate}
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
                {edu.currentlyTaking ? (
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
                      value={edu.endDate}
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
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="name">GPA</label>
              <input
                type="text"
                inputMode="decimal"
                pattern="^\d*\.?\d*$"
                placeholder="Enter your GPA"
                className="outline-none border rounded-lg px-3 py-2 appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&::-webkit-inner-spin-button]:appearance-none"
                onKeyDown={(e) => {
                  if (
                    !/^[0-9.]$/.test(e.key) && // Allow numbers (0-9) and dot (.)
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                  if (
                    e.key === "." &&
                    (e.currentTarget.value.includes(".") ||
                      e.currentTarget.value === "")
                  ) {
                    e.preventDefault();
                  }
                }}
              />
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

export default Education;
