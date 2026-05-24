"use client";

import {
  addExperience,
  moveExperience,
  removeExperience,
  updateExperience,
} from "@/redux/features/experienceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatBulletLines } from "@/lib/format";
import { ExperienceItem } from "@/types/resume";
import { DateRangeField } from "../ui/DateRangeField";
import { AddItemButton, FormSection } from "../ui/FormSection";
import { RepeatableItemCard } from "../ui/RepeatableItemCard";
import { TextArea } from "../ui/TextArea";
import { TextInput } from "../ui/TextInput";

const Experience = () => {
  const experiences = useAppSelector((state) => state.experience.experiences);
  const dispatch = useAppDispatch();

  const handleChange = <K extends keyof ExperienceItem>(
    index: number,
    field: K,
    value: ExperienceItem[K]
  ) => {
    dispatch(updateExperience({ index, field, value }));
  };

  const handleAccomplishmentChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleChange(index, "accomplishments", formatBulletLines(e.target.value));
  };

  return (
    <FormSection>
      {experiences.map((exp, index) => (
        <RepeatableItemCard
          key={index}
          index={index}
          total={experiences.length}
          onMoveUp={() => dispatch(moveExperience({ index, direction: "up" }))}
          onMoveDown={() =>
            dispatch(moveExperience({ index, direction: "down" }))
          }
          onRemove={() => dispatch(removeExperience(index))}
        >
          <TextInput
            label="Job title"
            placeholder="Senior Software Engineer"
            value={exp.jobTitle}
            onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <TextInput
              label="Company"
              placeholder="Acme Inc."
              value={exp.companyName}
              onChange={(e) =>
                handleChange(index, "companyName", e.target.value)
              }
            />
            <TextInput
              label="Location"
              placeholder="San Francisco, CA"
              value={exp.location}
              onChange={(e) => handleChange(index, "location", e.target.value)}
            />
          </div>

          <DateRangeField
            startDate={exp.startDate}
            endDate={exp.endDate}
            isCurrent={exp.currentlyWorking}
            currentLabel="Currently working here"
            onStartChange={(value) => handleChange(index, "startDate", value)}
            onEndChange={(value) => handleChange(index, "endDate", value)}
            onCurrentChange={(checked) =>
              handleChange(index, "currentlyWorking", checked)
            }
          />

          <TextArea
            label="Highlights"
            hint="One point per line"
            placeholder="Led a team of 5 engineers..."
            rows={4}
            value={exp.accomplishments}
            onChange={(e) => handleAccomplishmentChange(index, e)}
          />
        </RepeatableItemCard>
      ))}

      <AddItemButton
        label="Add experience"
        onClick={() => dispatch(addExperience())}
      />
    </FormSection>
  );
};

export default Experience;
