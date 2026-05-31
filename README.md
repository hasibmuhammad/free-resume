# freeResume

A modern, privacy-first resume builder with live preview, one-click PDF export, and real-time ATS parse-rate feedback. Built with Next.js and React — everything runs in the browser; no account required.

## Features

| Feature | Description |
| --- | --- |
| **Live preview** | See your resume update as you type. Zoom, fit-to-panel, and scroll through paginated pages. |
| **PDF export** | Download a print-ready A4 PDF generated with `@react-pdf/renderer`. |
| **Auto-save drafts** | Edits are debounced and saved to `localStorage` (~600 ms). Close the tab and pick up where you left off. |
| **Flexible sections** | Reorder Experience, Education, Projects, and Skills. Show or hide sections per role. |
| **Two-column layout** | Dense resumes flow into a main + sidebar layout. Skills stay pinned on the right; overflow paginates across pages. |
| **Live ATS checker** | Exports your resume to PDF, extracts text with PDF.js, and parses it with the OpenResume algorithm. Score reflects **field parse rate** — how much of your content an ATS can actually structure. |
| **Sample resume** | Load a pre-filled example to explore the editor or test ATS scoring. |
| **Dark mode** | System-aware theme toggle with persisted preference. |

## Tech stack

| Category | Choice |
| --- | --- |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) + [Tailwind CSS 3](https://tailwindcss.com/) |
| State | [Redux Toolkit](https://redux-toolkit.js.org/) |
| PDF generation | [@react-pdf/renderer](https://react-pdf.org/) |
| PDF text extraction | [PDF.js](https://mozilla.github.io/pdf.js/) |
| Resume parser | OpenResume-style parser (`src/lib/parse-resume-from-pdf`) |
| Icons | [Lucide](https://lucide.dev/) + [Heroicons](https://heroicons.com/) (react-icons) |

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install and run

```bash
git clone <your-repo-url>
cd resume-builder
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # ESLint
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Marketing homepage — hero, features, ATS highlight, FAQ |
| `/create-resume` | Split-pane editor — form on the left, live preview on the right |

## Project structure

```
src/
├── app/                    # Next.js App Router pages and UI components
│   ├── page.tsx            # Homepage
│   ├── create-resume/      # Resume editor
│   └── components/         # Feature components (Form, Preview, ATS, etc.)
├── lib/
│   ├── pdf/                # PDF document, styles, and flow layout
│   ├── parse-resume-from-pdf/  # PDF text extraction + resume parser
│   ├── atsAnalyze.ts       # ATS diagnostics and scoring
│   ├── atsParseRate.ts     # Field-level parse rate calculation
│   ├── resumeFlowLayout.ts # Two-column pagination estimates
│   ├── resumeDraft.ts      # localStorage draft persistence
│   └── sampleResume.ts     # Sample resume data
├── redux/                  # Redux store and feature slices
└── types/                  # Shared TypeScript types
```

## How ATS scoring works

The ATS checker mirrors what many online tools do (e.g. Enhancv-style parse rate):

1. Your current resume state is rendered to a PDF in the browser.
2. PDF.js extracts raw text from that PDF.
3. The OpenResume parser attempts to structure fields (name, email, experience, etc.).
4. **Parse rate** = parsed fields ÷ total fields, including required sections that are visible but empty.

Two-column layouts can lower parse rate because many ATS parsers read top-to-bottom in a single column. The score reflects parser compatibility, not job-match quality.

## Privacy

- No sign-up or backend storage.
- Resume data stays in your browser until you download the PDF.
- Drafts are stored locally under the key `freeresume-draft`.

## Resume sections

| Section | Default column |
| --- | --- |
| Experience | Main |
| Education | Main |
| Projects | Main |
| Skills | Sidebar |

Section order and visibility are persisted in the draft.

## Acknowledgments

The PDF resume parser is adapted from the [OpenResume](https://github.com/xitanggg/open-resume) project by xitanggg.

## License

Private project — add a license here if you plan to open-source it.
