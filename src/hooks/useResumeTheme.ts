import { resolveResumeTheme } from "@/lib/templates/resolveTheme";
import { useAppSelector } from "@/redux/hooks";

export function useResumeTheme() {
  const templateId = useAppSelector((state) => state.template.templateId);
  const customization = useAppSelector(
    (state) => state.template.themeCustomization
  );

  return resolveResumeTheme(templateId, customization);
}
