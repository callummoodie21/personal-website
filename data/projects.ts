import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    title: "React Native Modernisation",
    description:
      "Independently developed a cross-platform React Native proof-of-concept to replace the University's Cordova/Vue.js mobile stack. Implemented secure auth via MSAL and Azure AD, achieving ~80% decrease in UI frame drops over the existing app.",
    tags: ["React Native", "TypeScript", "Azure AD", "MSAL"],
  },
  {
    title: "Moodle-UofG Life Integration",
    description:
      "Built an integration layer between Moodle and the UofG Life hybrid app, giving students quick access to course content and deadlines. Created reusable Vue.js components for course lists, deadlines, and assessment info.",
    tags: ["Java Spring", "SQL", "Vue.js", "JavaScript"],
  },
  {
    title: "PintTracker",
    description:
      "Light-hearted side-project webapp for tracking and rating beers, pints, venues, and drinking habits over time. Features authentication, CRUD flows, and dashboards showing total pints, favourite venues, and personalised stats.",
    tags: ["Flask", "Python", "SQLite", "React", "TypeScript"],
  },
  {
    title: "Music Higher/Lower",
    description:
      "Fun personal webapp game for guessing which music video has a higher view count. Built with Next.js and deployed via Vercel, with video data supplied via the YouTube API.",
    tags: ["Django", "Python", "Next.js", "React", "YouTube API"],
  },
];
