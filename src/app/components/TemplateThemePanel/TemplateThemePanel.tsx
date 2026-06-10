"use client";

import {
  FontPresetDefinition,
  RESUME_FONT_PRESET_LIST,
} from "@/lib/templates/fontPresets";
import { ResumeFontPreset } from "@/lib/templates/types";
import { TEMPLATE_LIST } from "@/lib/templates/registry";
import { applyTemplate } from "@/redux/actions/applyTemplate";
import {
  patchThemeCustomization,
  resetThemeCustomization,
} from "@/redux/features/templateSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useResumeTheme } from "@/hooks/useResumeTheme";
import { LayoutTemplate, RotateCcw } from "lucide-react";

const SANS_FONTS = RESUME_FONT_PRESET_LIST.filter((f) => f.category === "sans");
const SERIF_FONTS = RESUME_FONT_PRESET_LIST.filter((f) => f.category === "serif");

function FontPresetButton({
  preset,
  selected,
  onSelect,
}: {
  preset: FontPresetDefinition;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex min-h-[3.25rem] w-full items-center justify-center rounded-lg border px-3 py-2 text-center text-sm leading-snug transition-colors ${
        selected
          ? "border-brand-500 bg-brand-600 text-white shadow-sm dark:border-brand-400 dark:bg-brand-500"
          : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600"
      }`}
      style={{ fontFamily: preset.previewFontFamily }}
    >
      <span className="block max-w-full break-words">{preset.label}</span>
    </button>
  );
}

function FontCategorySection({
  title,
  fonts,
  activePreset,
  onSelect,
}: {
  title: string;
  fonts: FontPresetDefinition[];
  activePreset: ResumeFontPreset;
  onSelect: (id: ResumeFontPreset) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {fonts.map((preset) => (
          <FontPresetButton
            key={preset.id}
            preset={preset}
            selected={activePreset === preset.id}
            onSelect={() => onSelect(preset.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function TemplateThemePanel() {
  const dispatch = useAppDispatch();
  const templateId = useAppSelector((state) => state.template.templateId);
  const customization = useAppSelector(
    (state) => state.template.themeCustomization
  );
  const theme = useResumeTheme();
  const activeFontPreset = customization.fontPreset ?? theme.fontPreset;

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <LayoutTemplate
            aria-hidden
            className="h-4 w-4 text-brand-600 dark:text-brand-400"
            strokeWidth={2}
          />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Template
          </h3>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {TEMPLATE_LIST.map((template) => {
            const selected = templateId === template.id;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => dispatch(applyTemplate(template.id))}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  selected
                    ? "border-brand-500 bg-brand-50/80 ring-1 ring-brand-500/30 dark:border-brand-400 dark:bg-brand-500/10"
                    : "border-slate-200/80 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
                }`}
              >
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                  {template.name}
                </span>
                <span className="mt-1 block text-xs leading-snug text-slate-500 dark:text-slate-400">
                  {template.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
          Colors
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Primary
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customization.primary ?? theme.colors.primary}
                onChange={(event) =>
                  dispatch(
                    patchThemeCustomization({ primary: event.target.value })
                  )
                }
                className="h-9 w-12 cursor-pointer rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900"
              />
              <span className="font-mono text-xs text-slate-500">
                {customization.primary ?? theme.colors.primary}
              </span>
            </div>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Accent
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customization.secondary ?? theme.colors.secondary}
                onChange={(event) =>
                  dispatch(
                    patchThemeCustomization({ secondary: event.target.value })
                  )
                }
                className="h-9 w-12 cursor-pointer rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900"
              />
              <span className="font-mono text-xs text-slate-500">
                {customization.secondary ?? theme.colors.secondary}
              </span>
            </div>
          </label>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
          Font family
        </h3>
        <div className="space-y-4">
          <FontCategorySection
            title="Sans-serif"
            fonts={SANS_FONTS}
            activePreset={activeFontPreset}
            onSelect={(id) =>
              dispatch(patchThemeCustomization({ fontPreset: id }))
            }
          />
          <FontCategorySection
            title="Serif"
            fonts={SERIF_FONTS}
            activePreset={activeFontPreset}
            onSelect={(id) =>
              dispatch(patchThemeCustomization({ fontPreset: id }))
            }
          />
        </div>
      </div>

      {(customization.primary ||
        customization.secondary ||
        customization.fontPreset) && (
        <button
          type="button"
          onClick={() => dispatch(resetThemeCustomization())}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <RotateCcw aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
          Reset theme to template defaults
        </button>
      )}
    </div>
  );
}
