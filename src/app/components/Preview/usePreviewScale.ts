"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const MIN_SCALE = 0.35;
const MAX_SCALE = 1;
const SCALE_STEP = 0.05;
/** Matches horizontal padding on the preview viewport wrapper (`p-4`). */
export const PREVIEW_VIEWPORT_INSET = 32;

function clampScale(value: number, max = MAX_SCALE) {
  return Math.min(max, Math.max(MIN_SCALE, value));
}

function computeWidthFitScale(viewportWidth: number, pageWidth: number) {
  const availableWidth = viewportWidth - PREVIEW_VIEWPORT_INSET;
  if (availableWidth <= 0) return MAX_SCALE;
  return clampScale(availableWidth / pageWidth);
}

export function usePreviewScale(pageWidth: number, pageHeight: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [scale, setScale] = useState(MIN_SCALE);
  const [scaleReady, setScaleReady] = useState(false);
  const [autoFit, setAutoFit] = useState(false);
  const [contentHeight, setContentHeight] = useState(pageHeight);
  const [maxScale, setMaxScale] = useState(MAX_SCALE);

  const paperHeight = contentHeight;

  const getViewportMetrics = useCallback(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return null;

    const availableWidth = viewport.clientWidth - PREVIEW_VIEWPORT_INSET;
    const availableHeight = viewport.clientHeight - PREVIEW_VIEWPORT_INSET;
    const naturalHeight =
      content.getBoundingClientRect().height || content.scrollHeight;

    if (availableWidth <= 0 || naturalHeight <= 0) return null;

    return { availableWidth, availableHeight, naturalHeight };
  }, [pageHeight]);

  const computeWidthFitScaleFromDom = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return MAX_SCALE;
    return computeWidthFitScale(viewport.clientWidth, pageWidth);
  }, [pageWidth]);

  const computeFitScale = useCallback(() => {
    const metrics = getViewportMetrics();
    if (!metrics) return computeWidthFitScaleFromDom();

    const { availableWidth, availableHeight, naturalHeight } = metrics;
    const widthScale = availableWidth / pageWidth;
    const heightScale = availableHeight / naturalHeight;

    return clampScale(Math.min(widthScale, heightScale));
  }, [computeWidthFitScaleFromDom, getViewportMetrics, pageWidth]);

  const syncMaxScale = useCallback(() => {
    const nextMax = computeWidthFitScaleFromDom();
    setMaxScale(nextMax);
    return nextMax;
  }, [computeWidthFitScaleFromDom]);

  const applyFitScale = useCallback(() => {
    setScale(computeFitScale());
  }, [computeFitScale]);

  /** Set width-fit scale before first paint to avoid a full-width flash on reload. */
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nextMax = computeWidthFitScale(viewport.clientWidth, pageWidth);
    setMaxScale(nextMax);
    setScale(nextMax);
    initializedRef.current = true;
    setScaleReady(true);
  }, [pageWidth]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new ResizeObserver((entries) => {
      const height =
        entries[0]?.contentRect.height ?? content.getBoundingClientRect().height;
      if (height > 0) {
        setContentHeight(height);
      }

      const nextMax = syncMaxScale();

      if (!initializedRef.current) {
        setScale(nextMax);
        initializedRef.current = true;
        setScaleReady(true);
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
        setScaleReady(true);
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
    scaleReady,
    autoFit,
    contentHeight,
    paperHeight,
    zoomIn,
    zoomOut,
    resetFit,
    canZoomIn: scale < maxScale - 0.001,
    canZoomOut: scale > MIN_SCALE,
  };
};
