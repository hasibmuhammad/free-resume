"use client";

import {
  addEducation,
  moveEducation,
  removeEducation,
  updateEducation,
} from "@/redux/features/educationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { EducationItem } from "@/types/resume";
import { DateRangeField } from "../ui/DateRangeField";
import { AddItemButton, FormSection } from "../ui/FormSection";
import { RepeatableItemCard } from "../ui/RepeatableItemCard";
import { TextInput } from "../ui/TextInput";

const Education = () => {
  const educations = useAppSelector((state) => state.education.educations);
  const dispatch = useAppDispatch();

  const handleChange = <K extends keyof EducationItem>(
    index: number,
    field: K,
    value: EducationItem[K]
  ) => {
    dispatch(updateEducation({ index, field, value }));
  };

  return (
    <FormSection>
      {educations.map((edu, index) => (
        <RepeatableItemCard
          key={index}
          index={index}
          total={educations.length}
          onMoveUp={() => dispatch(moveEducation({ index, direction: "up" }))}
          onMoveDown={() =>
            dispatch(moveEducation({ index, direction: "down" }))
          }
          onRemove={() => dispatch(removeEducation(index))}
        >
          <TextInput
            label="Degree"
            placeholder="B.S. Computer Science"
            value={edu.degree}
            onChange={(e) => handleChange(index, "degree", e.target.value)}
          />

          <TextInput
            label="School"
            placeholder="University name"
            value={edu.institute}
            onChange={(e) => handleChange(index, "institute", e.target.value)}
          />

          <DateRangeField
            startDate={edu.startDate}
            endDate={edu.endDate}
            isCurrent={edu.currentlyTaking}
            currentLabel="Currently enrolled"
            onStartChange={(value) => handleChange(index, "startDate", value)}
            onEndChange={(value) => handleChange(index, "endDate", value)}
            onCurrentChange={(checked) =>
              handleChange(index, "currentlyTaking", checked)
            }
          />

          <TextInput
            label="GPA (optional)"
            placeholder="3.8 / 4.0"
            value={edu.gpa}
            onChange={(e) => handleChange(index, "gpa", e.target.value)}
          />
        </RepeatableItemCard>
      ))}

      <AddItemButton
        label="Add education"
        onClick={() => dispatch(addEducation())}
      />
    </FormSection>
  );
};

export default Education;
