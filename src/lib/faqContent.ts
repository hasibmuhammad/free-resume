export const FAQ_ITEMS = [
  {
    question: "Is freeResume really free?",
    answer:
      "Yes — completely free with no hidden fees, premium tiers, or credit card required. Build and download your resume at no cost.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is needed. Open the editor and start typing. Your progress is saved automatically in your browser's local storage.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes. When you're happy with your resume, use the download button in the preview panel to export a print-ready A4 PDF.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your resume data stays on your device in browser local storage. We don't upload your information to a server.",
  },
  {
    question: "Will my resume work with ATS systems?",
    answer:
      "Yes. On every edit we generate your PDF, extract its text with PDF.js, and parse it with the OpenResume algorithm — checking whether name, email, sections, experience, and skills are readable the way Greenhouse, Lever, and Workday would see them.",
  },
] as const;
