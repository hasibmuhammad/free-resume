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

const SECTION_TITLE_HEIGHT = F.sectionTitleHeight;
const ENTRY_BASE_HEIGHT = F.entryBaseHeight;
const BULLET_LINE_HEIGHT = F.bulletLineHeight;
const SUMMARY_LINE_HEIGHT = F.summaryLineHeight;

/** Usable body height on page 1 after margins and header. */
export const RESUME_FIRST_PAGE_BODY_HEIGHT =
  RESUME_LAYOUT.pageHeight -
  RESUME_LAYOUT.marginTop -
  RESUME_LAYOUT.marginBottom -
  F.headerReserve;

/** Usable body height on continuation pages (no repeated header). */
export const RESUME_CONTINUATION_PAGE_BODY_HEIGHT =
  RESUME_LAYOUT.pageHeight -
  RESUME_LAYOUT.marginTop -
  RESUME_LAYOUT.marginBottom;

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

function estimateSummaryBlock(summary: string): number {
  return SECTION_TITLE_HEIGHT + estimateLines(summary, F.summaryCharsPerLine) * SUMMARY_LINE_HEIGHT;
}

function estimateExperienceEntry(accomplishments: string): number {
  let height = ENTRY_BASE_HEIGHT;
  if (accomplishments.trim()) {
    height += estimateLines(accomplishments) * BULLET_LINE_HEIGHT;
  }
  return height;
}

function estimateProjectEntry(keyFeatures: string): number {
  let height = ENTRY_BASE_HEIGHT;
  if (keyFeatures.trim()) {
    height += estimateLines(keyFeatures) * BULLET_LINE_HEIGHT;
  }
  return height;
}

function estimateEducationEntry(): number {
  return ENTRY_BASE_HEIGHT;
}

function estimateSkillsBlock(skillCount: number): number {
  return SECTION_TITLE_HEIGHT + Math.ceil(skillCount / 2) * F.skillRowHeight + 4;
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

function blockHeightInColumn(block: FlowBlock, columnBlocks: FlowBlock[]): number {
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

function sumColumnHeight(blocks: FlowBlock[]): number {
  return blocks.reduce((total, block, index) => {
    const prior = blocks.slice(0, index);
    return total + blockHeightInColumn(block, [...prior, block]);
  }, 0);
}

export function buildFlowBlocks(
  sections: ResumeSection[],
  visibility: Record<SectionKey, boolean>,
  hasContent: SectionContentMap,
  data: {
    summary: string;
    experiences: { accomplishments: string }[];
    projects: { keyFeatures: string }[];
    educations: unknown[];
    skills: string[];
  }
): FlowBlock[] {
  const blocks: FlowBlock[] = [];
  const trimmedSummary = data.summary.trim();

  if (trimmedSummary) {
    blocks.push({
      key: "summary",
      estimate: estimateSummaryBlock(trimmedSummary),
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
            estimate: estimateExperienceEntry(exp.accomplishments),
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
            estimate: estimateProjectEntry(project.keyFeatures),
            sectionKey: "project",
            entryIndex: index,
            pinRight,
          });
        });
        break;
      case "education":
        data.educations.forEach((_, index) => {
          blocks.push({
            key: `education-${index}`,
            estimate: estimateEducationEntry(),
            sectionKey: "education",
            entryIndex: index,
            pinRight,
          });
        });
        break;
      case "skill":
        blocks.push({
          key: "skill",
          estimate: estimateSkillsBlock(data.skills.length),
          sectionKey: "skill",
          pinRight: true,
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
    const pinnedHeight = sumColumnHeight(pinnedForPage);

    const page: FlowColumnPage = { left: [], right: [] };
    let leftHeight = 0;
    const rightOverflow: FlowBlock[] = [];
    let rightOverflowHeight = 0;
    const nextFlowRemaining: FlowBlock[] = [];

    for (const block of flowRemaining) {
      const leftWithBlock = blockHeightInColumn(block, [...page.left, block]);
      if (leftHeight + leftWithBlock <= maxColumnHeight) {
        page.left.push(block);
        leftHeight += leftWithBlock;
        continue;
      }

      const rightWithBlock = blockHeightInColumn(block, [...rightOverflow, block]);
      if (rightOverflowHeight + rightWithBlock + pinnedHeight <= maxColumnHeight) {
        rightOverflow.push(block);
        rightOverflowHeight += rightWithBlock;
        continue;
      }

      nextFlowRemaining.push(block);
    }

    page.right = [...rightOverflow, ...pinnedForPage];
    flowRemaining = nextFlowRemaining;

    if (page.left.length === 0 && page.right.length === 0) {
      const block = flowRemaining.shift();
      if (!block) break;
      page.left.push(block);
    }

    pages.push(page);
    if (pages.length > 20) break;
  }

  return pages;
}

export const FLOW_COLUMN_GAP = RESUME_LAYOUT.columnGap;
export const FLOW_MAIN_FLEX = RESUME_LAYOUT.mainFlex;
export const FLOW_SIDEBAR_FLEX = RESUME_LAYOUT.sidebarFlex;
