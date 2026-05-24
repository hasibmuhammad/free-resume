"use client";

import { updateBasicInfo } from "@/redux/features/basicInfoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BasicInfo as BasicInfoType } from "@/types/resume";
import { TextArea } from "../ui/TextArea";
import { TextInput } from "../ui/TextInput";
import { FormSection } from "../ui/FormSection";

const BasicInfo = () => {
  const dispatch = useAppDispatch();
  const basicInfo = useAppSelector((state) => state.basicInfo);

  const handleChange = (field: keyof BasicInfoType, value: string) => {
    dispatch(updateBasicInfo({ field, value }));
  };

  return (
    <FormSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <TextInput
          label="Full name"
          placeholder="Jane Doe"
          value={basicInfo.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
        <TextInput
          label="Job title"
          placeholder="Software Engineer"
          value={basicInfo.designation}
          onChange={(e) => handleChange("designation", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <TextInput
          label="Email"
          type="email"
          placeholder="jane@email.com"
          value={basicInfo.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <TextInput
          label="Phone"
          type="tel"
          placeholder="+1 555 000 0000"
          value={basicInfo.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      <TextInput
        label="Location"
        placeholder="City, Country"
        value={basicInfo.location}
        onChange={(e) => handleChange("location", e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <TextInput
          label="GitHub"
          type="url"
          placeholder="github.com/username"
          value={basicInfo.github}
          onChange={(e) => handleChange("github", e.target.value)}
        />
        <TextInput
          label="LinkedIn"
          type="url"
          placeholder="linkedin.com/in/username"
          value={basicInfo.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
        />
      </div>

      <TextArea
        label="Summary"
        placeholder="A short intro about your experience and strengths..."
        rows={3}
        value={basicInfo.summary}
        onChange={(e) => handleChange("summary", e.target.value)}
      />
    </FormSection>
  );
};

export default BasicInfo;
