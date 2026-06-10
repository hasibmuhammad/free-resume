import { applyTemplateSectionColumns } from "@/lib/templates/applyTemplate";
import { ResumeTemplateId } from "@/lib/templates/types";
import { applyTemplateColumns } from "@/redux/features/sectionsSlice";
import { setTemplateId } from "@/redux/features/templateSlice";
import { AppDispatch, RootState } from "@/redux/store";

export function applyTemplate(templateId: ResumeTemplateId) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setTemplateId(templateId));
    const { sections } = getState().sections;
    dispatch(
      applyTemplateColumns(
        applyTemplateSectionColumns(templateId, sections)
      )
    );
  };
}
