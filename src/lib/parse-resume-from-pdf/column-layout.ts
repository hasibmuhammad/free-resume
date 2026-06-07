import { RESUME_LAYOUT } from "@/lib/resumeTheme";
import type { TextItem, TextItems } from "@/lib/parse-resume-from-pdf/types";
import { getKnownSectionHeadingFromLine } from "@/lib/parse-resume-from-pdf/section-heading-detect";
import { groupTextItemsByPosition } from "@/lib/parse-resume-from-pdf/group-text-items-by-position";

function itemCenterX(item: TextItem): number {
  return item.x + item.width / 2;
}

/** X coordinate of the gutter between main and sidebar columns (our PDF layout). */
export function getResumeColumnSplitX(): number {
  const L = RESUME_LAYOUT;
  const innerWidth = L.pageWidth - 2 * L.marginX;
  const mainWidth =
    (innerWidth - L.columnGap) *
    (L.mainFlex / (L.mainFlex + L.sidebarFlex));
  return L.marginX + mainWidth + L.columnGap / 2;
}

/**
 * Y threshold: items at or above this are full-width header (name, contact).
 * Body columns sit below the first section heading.
 */
export function findHeaderBodySplitY(textItems: TextItems): number {
  const lines = groupTextItemsByPosition(textItems);
  for (const line of lines) {
    if (getKnownSectionHeadingFromLine(line)) {
      const y = line[0]?.y ?? 0;
      return y + 6;
    }
  }

  if (textItems.length === 0) return Infinity;
  const maxY = Math.max(...textItems.map((item) => item.y));
  return maxY - 110;
}

export function partitionTextItemsForColumns(textItems: TextItems): {
  header: TextItems;
  left: TextItems;
  right: TextItems;
} {
  const splitX = getResumeColumnSplitX();
  const bodySplitY = findHeaderBodySplitY(textItems);

  const header = textItems.filter((item) => item.y >= bodySplitY);
  const body = textItems.filter((item) => item.y < bodySplitY);

  const left = body.filter((item) => itemCenterX(item) < splitX);
  const right = body.filter((item) => itemCenterX(item) >= splitX);

  return { header, left, right };
}
