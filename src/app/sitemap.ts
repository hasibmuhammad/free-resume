import { absoluteUrl } from "@/lib/seo";
import { TEMPLATE_LIST } from "@/lib/templates/registry";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const templatePages: MetadataRoute.Sitemap = TEMPLATE_LIST.map(
    (template) => ({
      url: absoluteUrl(`/templates/${template.id}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/create-resume"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/templates"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/resume-checker"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...templatePages,
  ];
}
