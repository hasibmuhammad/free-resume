import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Free Resume Builder`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#6366f1",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "utilities"],
    lang: "en-US",
  };
}
