import { SectionContentMap, getVisibleSections } from "@/lib/resumeLayout";
import { RESUME_LAYOUT } from "@/lib/resumeTheme";
import { ResumeSection, SectionKey } from "@/types/resume";

export interface FlowBlock {
  key: string;
  estimate: number;
  sectionKey: SectionKey | "summary";
  entryIndex?: number;
  /** Main sections flow left first; pinned sections stay on the right column. */
  pinRight: boolean;
}

export interface FlowColumnPage {
  left: FlowBlock[];
  right: FlowBlock[];
}

const F = RESUME_LAYOUT.flow;

/** Keep a little breathing room at the bottom of each page. */
const COLUMN_BOTTOM_RESERVE = 8;
/** Small buffer so estimates err slightly high (avoids clipping). */
const ENTRY_SAFETY_BUFFER = 4;

const SECTION_TITLE_HEIGHT = F.sectionTitleHeight;
const ENTRY_BASE_HEIGHT = F.entryBaseHeight;
const BULLET_LINE_HEIGHT = F.bulletLineHeight;
const SUMMARY_LINE_HEIGHT = F.summaryLineHeight;

/** ~9pt body text in PDF — average character width in points. */
const PT_PER_CHAR = 5.8;

const CONTENT_WIDTH =
  RESUME_LAYOUT.pageWidth - RESUME_LAYOUT.marginX * 2;

const SPLIT_MAIN_WIDTH =
  ((CONTENT_WIDTH - RESUME_LAYOUT.columnGap) * RESUME_LAYOUT.mainFlex) /
  (RESUME_LAYOUT.mainFlex + RESUME_LAYOUT.sidebarFlex);

export type FlowMeasureMode = "single" | "split";

function flowMeasure(mode: FlowMeasureMode) {
  if (mode === "single") {
    const charsPerLine = Math.floor(CONTENT_WIDTH / PT_PER_CHAR);
    return {
      charsPerLine,
      summaryCharsPerLine: charsPerLine,
      skillsPerRow: 5,
    };
  }

  return {
    charsPerLine: Math.floor(SPLIT_MAIN_WIDTH / PT_PER_CHAR),
    summaryCharsPerLine: F.summaryCharsPerLine,
    skillsPerRow: 2,
  };
}

/** Usable body height on page 1 after margins and header. */
export const RESUME_FIRST_PAGE_BODY_HEIGHT =
  RESUME_LAYOUT.pageHeight -
  RESUME_LAYOUT.pageMarginY -
  RESUME_LAYOUT.pageMarginY -
  F.headerReserve;

/** Usable body height on continuation pages (no repeated header). */
export const RESUME_CONTINUATION_PAGE_BODY_HEIGHT =
  RESUME_LAYOUT.pageHeight -
  RESUME_LAYOUT.pageMarginY -
  RESUME_LAYOUT.pageMarginY;

/** Inner content area height per A4 sheet (matches preview/PDF page body). */
export const RESUME_PAGE_SHEET_HEIGHT = RESUME_CONTINUATION_PAGE_BODY_HEIGHT;

function estimateLines(text: string, charsPerLine: number = F.charsPerLine): number {
  return text
    .split("\n")
    .reduce(
      (total, line) =>
        total +
        Math.max(1, Math.ceil(Math.max(line.trim().length, 1) / charsPerLine)),
      0
    );
}

function estimateSummaryBlock(summary: string, measure: FlowMeasureMode): number {
  const { summaryCharsPerLine } = flowMeasure(measure);
  return (
    SECTION_TITLE_HEIGHT +
    estimateLines(summary, summaryCharsPerLine) * SUMMARY_LINE_HEIGHT +
    ENTRY_SAFETY_BUFFER
  );
}

function estimateExperienceEntry(
  accomplishments: string,
  measure: FlowMeasureMode
): number {
  const { charsPerLine } = flowMeasure(measure);
  let height = ENTRY_BASE_HEIGHT;
  if (accomplishments.trim()) {
    height += estimateLines(accomplishments, charsPerLine) * BULLET_LINE_HEIGHT;
  }
  return height + ENTRY_SAFETY_BUFFER;
}

function estimateProjectEntry(
  keyFeatures: string,
  measure: FlowMeasureMode
): number {
  const { charsPerLine } = flowMeasure(measure);
  let height = ENTRY_BASE_HEIGHT;
  if (keyFeatures.trim()) {
    height += estimateLines(keyFeatures, charsPerLine) * BULLET_LINE_HEIGHT;
  }
  return height + ENTRY_SAFETY_BUFFER;
}

function estimateEducationEntry(
  achievements: string,
  measure: FlowMeasureMode
): number {
  const { charsPerLine } = flowMeasure(measure);
  let height = ENTRY_BASE_HEIGHT;
  if (achievements.trim()) {
    height += estimateLines(achievements, charsPerLine) * BULLET_LINE_HEIGHT;
  }
  return height + ENTRY_SAFETY_BUFFER;
}

function estimateSkillsBlock(skillCount: number, measure: FlowMeasureMode): number {
  const { skillsPerRow } = flowMeasure(measure);
  return (
    SECTION_TITLE_HEIGHT +
    Math.ceil(skillCount / skillsPerRow) * F.skillRowHeight +
    4
  );
}

export function shouldShowSectionTitle(
  block: FlowBlock,
  columnBlocks: FlowBlock[]
): boolean {
  if (block.sectionKey === "summary" || block.sectionKey === "skill") {
    return true;
  }

  const firstInColumn = columnBlocks.find(
    (candidate) => candidate.sectionKey === block.sectionKey
  );
  return firstInColumn?.key === block.key;
}

function blockContentHeight(block: FlowBlock, columnBlocks: FlowBlock[]): number {
  let height = block.estimate;
  if (
    block.sectionKey !== "summary" &&
    block.sectionKey !== "skill" &&
    shouldShowSectionTitle(block, columnBlocks)
  ) {
    height += SECTION_TITLE_HEIGHT;
  }
  return height;
}

function blockTrailingMargin(block: FlowBlock): number {
  let margin = RESUME_LAYOUT.spacing.sectionBottom;
  if (block.sectionKey !== "summary" && block.sectionKey !== "skill") {
    margin += RESUME_LAYOUT.spacing.entryBottom;
  }
  return margin;
}

/**
 * Packed column height for pagination. Trailing margin on the last block is
 * omitted — it does not push content to the next page.
 */
function packColumnHeight(blocks: FlowBlock[]): number {
  if (blocks.length === 0) return 0;

  return blocks.reduce((total, block, index) => {
    const columnBlocks = blocks.slice(0, index + 1);
    let height = blockContentHeight(block, columnBlocks);
    if (index < blocks.length - 1) {
      height += blockTrailingMargin(block);
    }
    return total + height;
  }, 0);
}

function pageHasContent(page: FlowColumnPage): boolean {
  return page.left.length > 0 || page.right.length > 0;
}

function columnBudget(
  maxColumnHeight: number,
  reserve = COLUMN_BOTTOM_RESERVE
): number {
  return Math.max(0, maxColumnHeight - reserve);
}

function pageBodyBudget(pageIndex: number): number {
  const maxHeight =
    pageIndex === 0
      ? RESUME_FIRST_PAGE_BODY_HEIGHT
      : RESUME_CONTINUATION_PAGE_BODY_HEIGHT;
  return columnBudget(maxHeight);
}

/** Pull blocks from the following page when they fit on the current one. */
function reflowPageStacks(pages: FlowBlock[][]): FlowBlock[][] {
  if (pages.length <= 1) return pages;

  const result = pages.map((page) => [...page]);

  for (let pageIndex = 0; pageIndex < result.length - 1; pageIndex++) {
    const budget = pageBodyBudget(pageIndex);

    while (result[pageIndex + 1].length > 0) {
      const candidate = result[pageIndex + 1][0];
      if (packColumnHeight([...result[pageIndex], candidate]) <= budget) {
        result[pageIndex].push(result[pageIndex + 1].shift()!);
      } else {
        break;
      }
    }
  }

  return result.filter((page) => page.length > 0);
}

/** Move flow blocks from the right column back to the left when space allows. */
function reflowFlowColumns(
  left: FlowBlock[],
  rightFlow: FlowBlock[],
  maxColumnHeight: number
): { left: FlowBlock[]; rightFlow: FlowBlock[] } {
  const reflowedLeft = [...left];
  const reflowedRight = [...rightFlow];
  const budget = columnBudget(maxColumnHeight);

  let moved = true;
  while (moved) {
    moved = false;
    for (let i = 0; i < reflowedRight.length; i++) {
      const block = reflowedRight[i];
      const nextLeftHeight = packColumnHeight([...reflowedLeft, block]);
      if (nextLeftHeight <= budget) {
        reflowedLeft.push(block);
        reflowedRight.splice(i, 1);
        moved = true;
        break;
      }
    }
  }

  return { left: reflowedLeft, rightFlow: reflowedRight };
}

function partitionPageColumns(
  flowRemaining: FlowBlock[],
  maxColumnHeight: number,
  pinnedHeight: number
): {
  left: FlowBlock[];
  rightFlow: FlowBlock[];
  nextFlowRemaining: FlowBlock[];
} {
  const left: FlowBlock[] = [];
  const deferred: FlowBlock[] = [];
  const leftBudget = columnBudget(maxColumnHeight);
  const rightBudget = columnBudget(maxColumnHeight - pinnedHeight);

  // Pack whole entries on the left; defer anything that will not fully fit.
  for (const block of flowRemaining) {
    if (packColumnHeight([...left, block]) <= leftBudget) {
      left.push(block);
    } else {
      deferred.push(block);
    }
  }

  const rightFlow: FlowBlock[] = [];
  const nextFlowRemaining: FlowBlock[] = [];

  for (const block of deferred) {
    if (packColumnHeight([...rightFlow, block]) <= rightBudget) {
      rightFlow.push(block);
    } else {
      nextFlowRemaining.push(block);
    }
  }

  const reflowed = reflowFlowColumns(left, rightFlow, maxColumnHeight);

  return {
    left: reflowed.left,
    rightFlow: reflowed.rightFlow,
    nextFlowRemaining,
  };
}

export function buildFlowBlocks(
  sections: ResumeSection[],
  visibility: Record<SectionKey, boolean>,
  hasContent: SectionContentMap,
  data: {
    summary: string;
    experiences: { accomplishments: string }[];
    projects: { keyFeatures: string }[];
    educations: { achievements: string }[];
    skills: string[];
  },
  measure: FlowMeasureMode = "split"
): FlowBlock[] {
  const blocks: FlowBlock[] = [];
  const trimmedSummary = data.summary.trim();

  if (trimmedSummary) {
    blocks.push({
      key: "summary",
      estimate: estimateSummaryBlock(trimmedSummary, measure),
      sectionKey: "summary",
      pinRight: false,
    });
  }

  for (const section of getVisibleSections(sections, visibility, hasContent)) {
    const pinRight = section.column === "sidebar";

    switch (section.key) {
      case "experience":
        data.experiences.forEach((exp, index) => {
          blocks.push({
            key: `experience-${index}`,
            estimate: estimateExperienceEntry(exp.accomplishments, measure),
            sectionKey: "experience",
            entryIndex: index,
            pinRight,
          });
        });
        break;
      case "project":
        data.projects.forEach((project, index) => {
          blocks.push({
            key: `project-${index}`,
            estimate: estimateProjectEntry(project.keyFeatures, measure),
            sectionKey: "project",
            entryIndex: index,
            pinRight,
          });
        });
        break;
      case "education":
        data.educations.forEach((edu, index) => {
          blocks.push({
            key: `education-${index}`,
            estimate: estimateEducationEntry(edu.achievements, measure),
            sectionKey: "education",
            entryIndex: index,
            pinRight,
          });
        });
        break;
      case "skill":
        blocks.push({
          key: "skill",
          estimate: estimateSkillsBlock(data.skills.length, measure),
          sectionKey: "skill",
          pinRight,
        });
        break;
    }
  }

  return blocks;
}

/**
 * Main content fills the left column entry-by-entry; overflow goes to the right
 * above sidebar sections (Skills) which stay pinned on the right.
 */
export function paginateFlowColumns(blocks: FlowBlock[]): FlowColumnPage[] {
  if (blocks.length === 0) return [{ left: [], right: [] }];

  const pages: FlowColumnPage[] = [];
  let flowRemaining = blocks.filter((block) => !block.pinRight);
  const pinnedBlocks = blocks.filter((block) => block.pinRight);

  while (flowRemaining.length > 0 || (pages.length === 0 && pinnedBlocks.length > 0)) {
    const maxColumnHeight =
      pages.length === 0
        ? RESUME_FIRST_PAGE_BODY_HEIGHT
        : RESUME_CONTINUATION_PAGE_BODY_HEIGHT;

    const pinnedForPage = pages.length === 0 ? pinnedBlocks : [];
    const pinnedHeight = packColumnHeight(pinnedForPage);

    const page: FlowColumnPage = { left: [], right: [] };

    const partitioned = partitionPageColumns(
      flowRemaining,
      maxColumnHeight,
      pinnedHeight
    );
    page.left = partitioned.left;
    page.right = [...partitioned.rightFlow, ...pinnedForPage];
    flowRemaining = partitioned.nextFlowRemaining;

    if (page.left.length === 0 && page.right.length === 0) {
      const block = flowRemaining.shift();
      if (!block) break;
      page.left.push(block);
    }

    pages.push(page);
    if (pages.length > 20) break;
  }

  return reflowSplitColumnPages(pages.filter(pageHasContent), pinnedBlocks);
}

function reflowSplitColumnPages(
  pages: FlowColumnPage[],
  pinnedBlocks: FlowBlock[]
): FlowColumnPage[] {
  if (pages.length <= 1) return pages;

  const result = pages.map((page) => ({
    left: [...page.left],
    right: [...page.right],
  }));

  for (let pageIndex = 0; pageIndex < result.length - 1; pageIndex++) {
    const maxHeight =
      pageIndex === 0
        ? RESUME_FIRST_PAGE_BODY_HEIGHT
        : RESUME_CONTINUATION_PAGE_BODY_HEIGHT;
    const pinnedForPage = pageIndex === 0 ? pinnedBlocks : [];
    const pinnedHeight = packColumnHeight(pinnedForPage);
    const leftBudget = columnBudget(maxHeight - pinnedHeight);

    while (result[pageIndex + 1].left.length > 0) {
      const candidate = result[pageIndex + 1].left[0];
      if (packColumnHeight([...result[pageIndex].left, candidate]) <= leftBudget) {
        result[pageIndex].left.push(result[pageIndex + 1].left.shift()!);
      } else {
        break;
      }
    }
  }

  return result.filter(pageHasContent);
}

/** Paginate flow blocks into full-width single-column A4 pages. */
export function paginateFlowSingleColumn(blocks: FlowBlock[]): FlowBlock[][] {
  if (blocks.length === 0) return [[]];

  const pages: FlowBlock[][] = [];
  let remaining = [...blocks];

  while (remaining.length > 0) {
    const budget = pageBodyBudget(pages.length);
    const page: FlowBlock[] = [];
    const nextRemaining: FlowBlock[] = [];

    for (const block of remaining) {
      if (packColumnHeight([...page, block]) <= budget) {
        page.push(block);
      } else {
        nextRemaining.push(block);
      }
    }

    if (page.length === 0 && nextRemaining.length > 0) {
      page.push(nextRemaining.shift()!);
    }

    if (page.length > 0) {
      pages.push(page);
    }

    remaining = nextRemaining;
    if (pages.length > 20) break;
  }

  return reflowPageStacks(pages.filter((page) => page.length > 0));
}

export const FLOW_COLUMN_GAP = RESUME_LAYOUT.columnGap;
export const FLOW_MAIN_FLEX = RESUME_LAYOUT.mainFlex;
export const FLOW_SIDEBAR_FLEX = RESUME_LAYOUT.sidebarFlex;
