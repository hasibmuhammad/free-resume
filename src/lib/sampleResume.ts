import { DEFAULT_SECTION_ORDER, SECTION_REGISTRY } from "@/lib/sectionConfig";
import {
  RESUME_DRAFT_VERSION,
  ResumeDraft,
} from "@/types/resumeDraft";
import { EMPTY_DATE } from "@/types/resume";
import { DateValueType } from "react-tailwindcss-datepicker";

function singleDate(date: Date): DateValueType {
  return { startDate: date, endDate: null };
}

/** ATS-friendly sample resume — single-column layout, standard headings, parser-friendly fields. */
export function createSampleResumeDraft(): ResumeDraft {
  return {
    version: RESUME_DRAFT_VERSION,
    savedAt: new Date().toISOString(),
    basicInfo: {
      fullName: "Alex Morgan",
      designation: "Software Engineer",
      location: "San Francisco, CA",
      email: "alex.morgan@email.com",
      phone: "(415) 555-0142",
      summary:
        "Software engineer with 5+ years of experience building scalable web applications, leading cross-functional teams, and delivering measurable business impact.",
      github: "https://github.com/alexmorgan",
      linkedin: "https://linkedin.com/in/alexmorgan",
    },
    experience: {
      experiences: [
        {
          companyName: "TechFlow Inc",
          jobTitle: "Senior Software Engineer",
          location: "San Francisco, CA",
          currentlyWorking: true,
          startDate: singleDate(new Date("2021-03-01")),
          endDate: EMPTY_DATE,
          accomplishments:
            "Architected microservices platform handling 2M daily API requests\nLed React migration that reduced page load time by 40 percent\nMentored three junior engineers through weekly code reviews",
        },
        {
          companyName: "DataPulse Labs",
          jobTitle: "Software Engineer",
          location: "Oakland, CA",
          currentlyWorking: false,
          startDate: singleDate(new Date("2018-06-01")),
          endDate: singleDate(new Date("2021-02-28")),
          accomplishments:
            "Developed customer dashboard used by 50K monthly active users\nOptimized PostgreSQL queries cutting report generation time in half\nCollaborated with product team to ship 12 features across two quarters",
        },
      ],
    },
    education: {
      educations: [
        {
          degree: "Bachelor of Science in Computer Science",
          gpa: "3.8",
          institute: "California State University",
          currentlyTaking: false,
          startDate: singleDate(new Date("2014-09-01")),
          endDate: singleDate(new Date("2018-05-15")),
        },
      ],
    },
    project: {
      projects: [
        {
          projectTitle: "Open Source Task Manager",
          currentlyWorking: false,
          startDate: singleDate(new Date("2023-01-01")),
          endDate: singleDate(new Date("2023-08-01")),
          keyFeatures:
            "Built a React and Node.js app with real-time sync for 1,200 GitHub stars\nImplemented JWT authentication and role-based access for team workspaces\nDeployed on AWS with CI/CD pipeline reducing release time by 60 percent",
        },
        {
          projectTitle: "Personal Finance Dashboard",
          currentlyWorking: false,
          startDate: singleDate(new Date("2022-04-01")),
          endDate: singleDate(new Date("2022-11-30")),
          keyFeatures:
            "Designed interactive charts with D3.js for spending trends and budget tracking\nConnected Plaid API to aggregate accounts from 10,000 plus institutions\nAchieved Lighthouse performance score of 95 on mobile and desktop",
        },
      ],
    },
    skill: {
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "PostgreSQL",
        "AWS",
      ],
    },
    sections: {
      sections: DEFAULT_SECTION_ORDER.map((key) => ({
        key,
        ...SECTION_REGISTRY[key],
        column: "main" as const,
      })),
      visibility: {
        experience: true,
        education: true,
        skill: true,
        project: true,
      },
    },
  };
}
