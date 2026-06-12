import { ResumeTemplateId } from "@/lib/templates/types";

export interface TemplatePageContent {
  /** SEO page title, e.g. "Modern Split Resume Template" */
  seoTitle: string;
  /** Meta description for the template landing page. */
  seoDescription: string;
  headline: string;
  intro: string;
  bestFor: string[];
  highlights: string[];
}

export const TEMPLATE_PAGE_CONTENT: Record<
  ResumeTemplateId,
  TemplatePageContent
> = {
  "modern-split": {
    seoTitle: "Modern Split Resume Template — Free & ATS-Friendly",
    seoDescription:
      "Build a resume with the free Modern Split template: a two-column layout with a skills sidebar, live preview, and one-click PDF download. No sign-up required.",
    headline: "A two-column layout that fits more on one page",
    intro:
      "The Modern Split template places your experience, projects, and education in a wide main column while skills sit in a scannable sidebar. Recruiters see your career story and your toolkit at the same time — no scrolling, no hunting. Despite the two-column look, the exported PDF keeps a parser-safe reading order, so applicant tracking systems read it cleanly.",
    bestFor: [
      "Mid-level professionals with 3+ roles",
      "Candidates with long skill lists",
      "Dense, one-page resumes",
    ],
    highlights: [
      "Two-column layout with skills sidebar",
      "Compact typography fits more per page",
      "ATS-safe reading order in the exported PDF",
      "Customizable accent colors and fonts",
    ],
  },
  "classic-single": {
    seoTitle: "Classic Single-Column Resume Template — Free & ATS-Friendly",
    seoDescription:
      "Build a resume with the free Classic template: a traditional single-column layout trusted by recruiters, with live preview and instant PDF export.",
    headline: "The traditional format recruiters know by heart",
    intro:
      "Every section stacks top to bottom in one clean column — the format hiring managers have read for decades and the safest possible structure for automated resume screeners. Serif headings give it a timeless, professional character that works in conservative industries like finance, law, and government.",
    bestFor: [
      "Conservative industries (finance, law, government)",
      "Career changers who need maximum clarity",
      "Anyone prioritizing ATS compatibility above all",
    ],
    highlights: [
      "Single-column flow, simplest possible parsing",
      "Serif typography with a classic feel",
      "Clear section separation",
      "Works for any experience level",
    ],
  },
  executive: {
    seoTitle: "Executive Resume Template — Free Serif Design for Senior Roles",
    seoDescription:
      "Build a leadership resume with the free Executive template: refined serif typography, charcoal-and-gold palette, live preview, and PDF download.",
    headline: "Gravitas for senior and leadership resumes",
    intro:
      "Refined serif headings and a restrained charcoal-and-gold palette signal seniority before a single word is read. The single-column structure gives your leadership narrative room to breathe, with accomplishments presented in confident, uncluttered lines. Ideal when the role calls for presence, not flash.",
    bestFor: [
      "Directors, VPs, and C-level candidates",
      "Senior managers moving up",
      "Consultants and board applications",
    ],
    highlights: [
      "Elegant serif display typography",
      "Charcoal & gold executive palette",
      "Single column for a commanding narrative",
      "ATS-readable despite the premium look",
    ],
  },
  tech: {
    seoTitle: "Tech Resume Template — Free Two-Column Design for Engineers",
    seoDescription:
      "Build a developer resume with the free Tech template: skills and education in a sidebar, projects up front, ATS-checked PDF export. No sign-up.",
    headline: "Built for engineers who ship",
    intro:
      "The Tech template moves both skills and education into the sidebar, freeing the main column for what technical recruiters actually scan first: your experience and projects. The teal palette reads modern without being loud, and the Roboto typeface keeps everything crisp at small sizes — perfect for content-dense engineering resumes.",
    bestFor: [
      "Software engineers and developers",
      "Data scientists and DevOps engineers",
      "Candidates with strong project portfolios",
    ],
    highlights: [
      "Skills and education in the sidebar",
      "Projects get prime main-column space",
      "Modern teal accent palette",
      "Compact, screen-friendly typography",
    ],
  },
  elegant: {
    seoTitle: "Elegant Resume Template — Free Serif Two-Column Design",
    seoDescription:
      "Build a polished resume with the free Elegant template: warm serif headings, burgundy accents, two-column layout, and instant PDF download.",
    headline: "Polish that stands out in a stack of resumes",
    intro:
      "Warm Lora serif headings and a deep burgundy accent give this two-column template a distinctive, sophisticated character. It balances personality with professionalism — memorable enough to stand out, restrained enough for client-facing and creative-professional roles where presentation matters.",
    bestFor: [
      "Marketing, PR, and communications roles",
      "Designers and creative professionals",
      "Client-facing and consulting positions",
    ],
    highlights: [
      "Warm serif typography (Lora)",
      "Distinctive burgundy & bronze palette",
      "Two-column layout with skills sidebar",
      "Memorable without sacrificing ATS safety",
    ],
  },
  minimal: {
    seoTitle: "Minimal Resume Template — Free Clean Single-Column Design",
    seoDescription:
      "Build a clean resume with the free Minimal template: near-monochrome design, generous whitespace, live preview, and one-click PDF export.",
    headline: "Nothing between the reader and your content",
    intro:
      "Near-monochrome, generous whitespace, and Montserrat's geometric letterforms — the Minimal template strips away every decoration so your accomplishments carry the page. It's the strongest choice when your experience speaks for itself, and the single-column structure makes it bulletproof for automated screeners.",
    bestFor: [
      "Strong resumes that need no decoration",
      "Minimalist and design-conscious candidates",
      "Academic and research applications",
    ],
    highlights: [
      "Near-monochrome, distraction-free design",
      "Generous whitespace and clean hierarchy",
      "Geometric sans-serif typography",
      "Maximum ATS compatibility",
    ],
  },
};
