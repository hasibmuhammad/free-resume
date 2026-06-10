"use client";

import { ResolvedResumeTheme } from "@/lib/templates/resolveTheme";
import { createContext, useContext, ReactNode } from "react";
import { useResumeTheme } from "@/hooks/useResumeTheme";

const PreviewThemeContext = createContext<ResolvedResumeTheme | null>(null);

export function PreviewThemeProvider({ children }: { children: ReactNode }) {
  const theme = useResumeTheme();
  return (
    <PreviewThemeContext.Provider value={theme}>
      {children}
    </PreviewThemeContext.Provider>
  );
}

export function usePreviewTheme(): ResolvedResumeTheme {
  const theme = useContext(PreviewThemeContext);
  if (!theme) {
    throw new Error("usePreviewTheme must be used within PreviewThemeProvider");
  }
  return theme;
}
