"use client";
import {
  addEducation,
  moveEducation,
  removeEducation,
  updateEducation,
} from "@/redux/features/educationSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import ArrowDown from "../Icons/ArrowDown";
import ArrowUp from "../Icons/ArrowUp";
import IconDelete from "../Icons/IconDelete";

interface EducationItem {
  degree: string;
  institute: string;
  currentlyTaking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
}

const Education = () => {
  const dispatch = useDispatch();
  const educations = useSelector(
    (state: RootState) => state.education.educations
  );

  const handleChange = (
    index: number,
    field: keyof EducationItem,
    value: string | boolean | DateValueType
  ) => {
    dispatch(updateEducation({ index, field, value }));
  };

  const addItem = () => {
    dispatch(addEducation());
  };

  const removeItem = (index: number) => {
    if (educations.length > 1) {
      dispatch(removeEducation(index));
    }
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    dispatch(moveEducation({ index, direction }));
  };

  return (
    <section className="border p-4 rounded-lg">
      <form className="my-5 space-y-4">
        {educations.map((edu, index) => (
          <div key={index} className="border p-4 rounded-lg space-y-4 relative">
            <div className="flex items-center justify-end gap-2">
              {index > 0 && (
                <button type="button" onClick={() => moveItem(index, "up")}>
                  <ArrowUp />
                </button>
              )}
              {index < educations.length - 1 && (
                <button type="button" onClick={() => moveItem(index, "down")}>
                  <ArrowDown />
                </button>
              )}
              {educations.length !== 1 && (
                <button type="button" onClick={() => removeItem(index)}>
                  <IconDelete />
                </button>
              )}
            </div>

            <div className="w-full flex flex-col gap-1">
              <label>Degree</label>
              <input
                type="text"
                placeholder="Enter degree name"
                className="outline-none border rounded-lg px-3 py-2"
                value={edu.degree}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <label>Institute</label>
              <input
                type="text"
                placeholder="Enter institute name"
                className="outline-none border rounded-lg px-3 py-2"
                value={edu.institute}
                onChange={(e) =>
                  handleChange(index, "institute", e.target.value)
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
