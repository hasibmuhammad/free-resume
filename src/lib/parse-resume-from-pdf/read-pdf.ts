import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import type { TextItem as PdfjsTextItem } from "pdfjs-dist/types/src/display/api";
import type { TextItem, TextItems } from "@/lib/parse-resume-from-pdf/types";

if (typeof window !== "undefined") {
  GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
}

async function readPdfDocument(pdfFile: Awaited<ReturnType<typeof getDocument>["promise"]>): Promise<TextItems> {
  let textItems: TextItems = [];

  for (let i = 1; i <= pdfFile.numPages; i++) {
    const page = await pdfFile.getPage(i);
    const textContent = await page.getTextContent();

    await page.getOperatorList();
    const commonObjs = page.commonObjs;

    const pageTextItems = textContent.items.map((item) => {
      const {
        str: text,
        transform,
        fontName: pdfFontName,
        ...otherProps
      } = item as PdfjsTextItem;

      const x = transform[4];
      const y = transform[5];

      const fontObj = commonObjs.get(pdfFontName);
      const fontName =
        fontObj && typeof fontObj === "object" && "name" in fontObj
          ? String(fontObj.name)
          : String(pdfFontName);

      const newText = text.replace(/-­‐/g, "-");

      return {
        ...otherProps,
        fontName,
        text: newText,
        x,
        y,
      };
    });

    textItems.push(...pageTextItems);
  }

  const isEmptySpace = (textItem: TextItem) =>
    !textItem.hasEOL && textItem.text.trim() === "";
  return textItems.filter((textItem) => !isEmptySpace(textItem));
}

export async function readPdf(fileUrl: string): Promise<TextItems> {
  const pdfFile = await getDocument(fileUrl).promise;
  return readPdfDocument(pdfFile);
}

export async function readPdfFromBlob(blob: Blob): Promise<TextItems> {
  const buffer = await blob.arrayBuffer();
  const pdfFile = await getDocument({ data: buffer }).promise;
  return readPdfDocument(pdfFile);
}
