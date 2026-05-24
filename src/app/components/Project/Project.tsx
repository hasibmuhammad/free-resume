"use client";

import {
  addProject,
  moveProject,
  removeProject,
  updateProject,
} from "@/redux/features/projectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatBulletLines } from "@/lib/format";
import { ProjectItem } from "@/types/resume";
import { DateRangeField } from "../ui/DateRangeField";
import { AddItemButton, FormSection } from "../ui/FormSection";
import { RepeatableItemCard } from "../ui/RepeatableItemCard";
import { TextArea } from "../ui/TextArea";
import { TextInput } from "../ui/TextInput";

const Project = () => {
  const projects = useAppSelector((state) => state.project.projects);
  const dispatch = useAppDispatch();

  const handleChange = <K extends keyof ProjectItem>(
    index: number,
    field: K,
    value: ProjectItem[K]
  ) => {
    dispatch(updateProject({ index, field, value }));
  };

  const handleFeaturesChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleChange(index, "keyFeatures", formatBulletLines(e.target.value));
  };

  return (
    <FormSection>
      {projects.map((project, index) => (
        <RepeatableItemCard
          key={index}
          index={index}
          total={projects.length}
          onMoveUp={() => dispatch(moveProject({ index, direction: "up" }))}
          onMoveDown={() =>
            dispatch(moveProject({ index, direction: "down" }))
          }
          onRemove={() => dispatch(removeProject(index))}
        >
          <TextInput
            label="Project name"
            placeholder="E-commerce Platform"
            value={project.projectTitle}
            onChange={(e) =>
              handleChange(index, "projectTitle", e.target.value)
            }
          />

          <DateRangeField
            startDate={project.startDate}
            endDate={project.endDate}
            isCurrent={project.currentlyWorking}
            currentLabel="Still in progress"
            onStartChange={(value) => handleChange(index, "startDate", value)}
            onEndChange={(value) => handleChange(index, "endDate", value)}
            onCurrentChange={(checked) =>
              handleChange(index, "currentlyWorking", checked)
            }
          />

          <TextArea
            label="Description"
            hint="One point per line"
            placeholder="Built with Next.js and TypeScript..."
            rows={4}
            value={project.keyFeatures}
            onChange={(e) => handleFeaturesChange(index, e)}
          />
        </RepeatableItemCard>
      ))}

      <AddItemButton
        label="Add project"
        onClick={() => dispatch(addProject())}
      />
    </FormSection>
  );
};

export default Project;
