import type {
  ResumeSectionToLines,
  TextItem,
  TextItems,
  FeatureSet,
} from "@/lib/parse-resume-from-pdf/types";
import { getSectionLinesByKeywords } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import {
  isBold,
  hasNumber,
  hasComma,
  hasLetter,
  hasLetterAndIsAllUpperCase,
} from "@/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { getTextWithHighestFeatureScore } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/feature-scoring-system";

// Name
export const matchOnlyLetterSpaceOrPeriod = (item: TextItem) =>
  item.text.match(/^[a-zA-Z\s\.]+$/);

// Email
// Simple email regex: xxx@xxx.xxx (xxx = anything not space)
export const matchEmail = (item: TextItem) => item.text.match(/\S+@\S+\.\S+/);
const hasAt = (item: TextItem) => item.text.includes("@");

// Phone
// Simple phone regex that matches (xxx)-xxx-xxxx where () and - are optional, - can also be space
export const matchPhone = (item: TextItem) =>
  item.text.match(/\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/) ||
  item.text.match(/\+?\d[\d\s\-().]{7,}\d/);
const hasParenthesis = (item: TextItem) => /\([0-9]+\)/.test(item.text);

// Location
// Simple location regex that matches "<City>, <ST>"
export const matchCityAndState = (item: TextItem) =>
  item.text.match(/[A-Z][a-zA-Z\s]+, [A-Z]{2}/);

// Url
// Simple url regex that matches "xxx.xxx/xxx" (xxx = anything not space)
export const matchUrl = (item: TextItem) => item.text.match(/\S+\.[a-z]+\/\S+/);
// Match https://xxx.xxx where s is optional
const matchUrlHttpFallback = (item: TextItem) =>
  item.text.match(/https?:\/\/\S+\.\S+/);
// Match www.xxx.xxx
const matchUrlWwwFallback = (item: TextItem) =>
  item.text.match(/www\.\S+\.\S+/);
const hasSlash = (item: TextItem) => item.text.includes("/");

// Summary
const has4OrMoreWords = (item: TextItem) => item.text.split(" ").length >= 4;

/**
 *              Unique Attribute
 * Name         Bold or Has all uppercase letter
 * Email        Has @
 * Phone        Has ()
 * Location     Has ,    (overlap with summary)
 * Url          Has slash
 * Summary      Has 4 or more words
 */

/**
 * Name -> contains only letters/space/period, e.g. Leonardo W. DiCaprio
 *         (it isn't common to include middle initial in resume)
 *      -> is bolded or has all letters as uppercase
 */
const NAME_FEATURE_SETS: FeatureSet[] = [
  [matchOnlyLetterSpaceOrPeriod, 3, true],
  [isBold, 2],
  [hasLetterAndIsAllUpperCase, 2],
  // Match against other unique attributes
  [hasAt, -4], // Email
  [hasNumber, -4], // Phone
  [hasParenthesis, -4], // Phone
  [hasComma, -4], // Location
  [hasSlash, -4], // Url
  [has4OrMoreWords, -2], // Summary
];

// Email -> match email regex xxx@xxx.xxx
const EMAIL_FEATURE_SETS: FeatureSet[] = [
  [matchEmail, 4, true],
  [isBold, -1], // Name
  [hasLetterAndIsAllUpperCase, -1], // Name
  [hasParenthesis, -4], // Phone
  [hasComma, -4], // Location
  [hasSlash, -4], // Url
  [has4OrMoreWords, -4], // Summary
];

// Phone -> match phone regex (xxx)-xxx-xxxx
const PHONE_FEATURE_SETS: FeatureSet[] = [
  [matchPhone, 4, true],
  [hasLetter, -4], // Name, Email, Location, Url, Summary
];

// Location -> match location regex <City>, <ST>
const LOCATION_FEATURE_SETS: FeatureSet[] = [
  [matchCityAndState, 4, true],
  [isBold, -1], // Name
  [hasAt, -4], // Email
  [hasParenthesis, -3], // Phone
  [hasSlash, -4], // Url
];

// URL -> match url regex xxx.xxx/xxx
const URL_FEATURE_SETS: FeatureSet[] = [
  [matchUrl, 4, true],
  [matchUrlHttpFallback, 3, true],
  [matchUrlWwwFallback, 3, true],
  [isBold, -1], // Name
  [hasAt, -4], // Email
  [hasParenthesis, -3], // Phone
  [hasComma, -4], // Location
  [has4OrMoreWords, -4], // Summary
];

// Summary -> has 4 or more words
const SUMMARY_FEATURE_SETS: FeatureSet[] = [
  [has4OrMoreWords, 4],
  [isBold, -1], // Name
  [hasAt, -4], // Email
  [hasParenthesis, -3], // Phone
  [matchCityAndState, -4, false], // Location
];

const PROFILE_URL_REGEX =
  /(?:https?:\/\/|www\.)?(?:github\.com\/[^\s,;|)]+|linkedin\.com\/[^\s,;|)]+|[^\s,;|)]+\.[a-z]{2,}\/[^\s,;|)]+)/gi;

function trimUrlToken(url: string): string {
  return url.replace(/[.,;|)\]]+$/, "").trim();
}

function extractAllProfileUrls(textItems: TextItems): string[] {
  const urls: string[] = [];
  const seen = new Set<string>();

  for (const item of textItems) {
    const matches = item.text.matchAll(PROFILE_URL_REGEX);
    for (const match of matches) {
      const url = trimUrlToken(match[0]);
      const key = url.toLowerCase();
      if (!url || seen.has(key)) continue;
      seen.add(key);
      urls.push(url);
    }
  }

  return urls;
}

function classifySocialUrls(urls: string[]) {
  let github = "";
  let linkedin = "";
  let other = "";

  for (const url of urls) {
    const lower = url.toLowerCase();
    if (lower.includes("github.com")) {
      if (!github) github = url;
      continue;
    }
    if (lower.includes("linkedin.com")) {
      if (!linkedin) linkedin = url;
      continue;
    }
    if (!other) other = url;
  }

  return {
    github,
    linkedin,
    url: other || linkedin || github,
  };
}

function socialFromSingleUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return { github: "", linkedin: "" };

  const lower = trimmed.toLowerCase();
  if (lower.includes("github.com")) {
    return { github: trimmed, linkedin: "" };
  }
  if (lower.includes("linkedin.com")) {
    return { github: "", linkedin: trimmed };
  }

  return { github: "", linkedin: "" };
}

export const extractProfile = (sections: ResumeSectionToLines) => {
  const lines = sections.profile || [];
  const textItems = lines.flat();

  const [name, nameScores] = getTextWithHighestFeatureScore(
    textItems,
    NAME_FEATURE_SETS
  );
  const [email, emailScores] = getTextWithHighestFeatureScore(
    textItems,
    EMAIL_FEATURE_SETS
  );
  const [phone, phoneScores] = getTextWithHighestFeatureScore(
    textItems,
    PHONE_FEATURE_SETS
  );
  const [location, locationScores] = getTextWithHighestFeatureScore(
    textItems,
    LOCATION_FEATURE_SETS
  );
  const [url, urlScores] = getTextWithHighestFeatureScore(
    textItems,
    URL_FEATURE_SETS
  );
  const [summary, summaryScores] = getTextWithHighestFeatureScore(
    textItems,
    SUMMARY_FEATURE_SETS,
    undefined,
    true
  );

  const summaryLines = getSectionLinesByKeywords(sections, ["summary"]);
  const summarySection = summaryLines
    .flat()
    .map((textItem) => textItem.text)
    .join(" ");
  const objectiveLines = getSectionLinesByKeywords(sections, ["objective"]);
  const objectiveSection = objectiveLines
    .flat()
    .map((textItem) => textItem.text)
    .join(" ");

  const socialUrls = classifySocialUrls(extractAllProfileUrls(textItems));
  const scoredSocial = socialFromSingleUrl(url);
  const resolvedUrl = socialUrls.url || url;

  return {
    profile: {
      name,
      email,
      phone,
      location,
      url: resolvedUrl,
      github: socialUrls.github || scoredSocial.github,
      linkedin: socialUrls.linkedin || scoredSocial.linkedin,
      // Dedicated section takes higher precedence over profile summary
      summary: summarySection || objectiveSection || summary,
    },
    // For debugging
    profileScores: {
      name: nameScores,
      email: emailScores,
      phone: phoneScores,
      location: locationScores,
      url: urlScores,
      summary: summaryScores,
    },
  };
};
