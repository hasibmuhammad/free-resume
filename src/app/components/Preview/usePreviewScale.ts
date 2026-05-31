"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_SCALE = 0.35;
const MAX_SCALE = 1;
const SCALE_STEP = 0.05;
/** Matches horizontal padding on the preview viewport wrapper (`p-4`). */
export const PREVIEW_VIEWPORT_INSET = 32;

function clampScale(value: number, max = MAX_SCALE) {
  return Math.min(max, Math.max(MIN_SCALE, value));
}

export function usePreviewScale(pageWidth: number, pageHeight: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [scale, setScale] = useState(MAX_SCALE);
  const [autoFit, setAutoFit] = useState(false);
  const [contentHeight, setContentHeight] = useState(pageHeight);
  const [maxScale, setMaxScale] = useState(MAX_SCALE);

  const paperHeight = Math.max(contentHeight, pageHeight);

  const getViewportMetrics = useCallback(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return null;

    const availableWidth = viewport.clientWidth - PREVIEW_VIEWPORT_INSET;
    const availableHeight = viewport.clientHeight - PREVIEW_VIEWPORT_INSET;
    const naturalHeight = Math.max(
      content.getBoundingClientRect().height || content.scrollHeight,
      pageHeight
    );

    if (availableWidth <= 0 || naturalHeight <= 0) return null;

    return { availableWidth, availableHeight, naturalHeight };
  }, [pageHeight, pageWidth]);

  const computeWidthFitScale = useCallback(() => {
    const metrics = getViewportMetrics();
    if (!metrics) return MAX_SCALE;
    return clampScale(metrics.availableWidth / pageWidth);
  }, [getViewportMetrics, pageWidth]);

  const computeFitScale = useCallback(() => {
    const metrics = getViewportMetrics();
    if (!metrics) return MAX_SCALE;

    const { availableWidth, availableHeight, naturalHeight } = metrics;
    const widthScale = availableWidth / pageWidth;
    const heightScale = availableHeight / naturalHeight;

    return clampScale(Math.min(widthScale, heightScale));
  }, [getViewportMetrics, pageWidth]);

  const syncMaxScale = useCallback(() => {
    const nextMax = computeWidthFitScale();
    setMaxScale(nextMax);
    return nextMax;
  }, [computeWidthFitScale]);

  const applyFitScale = useCallback(() => {
    setScale(computeFitScale());
  }, [computeFitScale]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height ?? content.getBoundingClientRect().height;
      if (height > 0) {
        setContentHeight(height);
      }
      const nextMax = syncMaxScale();

      if (!initializedRef.current) {
        setScale(nextMax);
        initializedRef.current = true;
        return;
      }

      if (autoFit) {
        applyFitScale();
        return;
      }

      setScale((current) => clampScale(current, nextMax));
    });

    observer.observe(content);
    return () => observer.disconnect();
  }, [autoFit, applyFitScale, syncMaxScale]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => {
      const nextMax = syncMaxScale();

      if (!initializedRef.current) {
        setScale(nextMax);
        initializedRef.current = true;
        return;
      }

      if (autoFit) {
        applyFitScale();
        return;
      }

      setScale((current) => clampScale(current, nextMax));
    });

    observer.observe(viewport);
    return () => observer.disconnect();
  }, [autoFit, applyFitScale, syncMaxScale]);

  const zoomIn = useCallback(() => {
    setAutoFit(false);
    setScale((current) => clampScale(current + SCALE_STEP, maxScale));
  }, [maxScale]);

  const zoomOut = useCallback(() => {
    setAutoFit(false);
    setScale((current) => clampScale(current - SCALE_STEP, maxScale));
  }, [maxScale]);

  const resetFit = useCallback(() => {
    setAutoFit(true);
    setScale(computeFitScale());
  }, [computeFitScale]);

  return {
    viewportRef,
    contentRef,
    scale,
    autoFit,
    contentHeight,
    paperHeight,
    zoomIn,
    zoomOut,
    resetFit,
    canZoomIn: scale < maxScale - 0.001,
    canZoomOut: scale > MIN_SCALE,
  };
}
